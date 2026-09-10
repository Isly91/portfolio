import express from 'express';
import cors from 'cors';
import { execFile } from 'child_process';
import fetch from 'node-fetch';
import { randomUUID } from 'crypto';

const app = express();
const PORT = 5000;
const IMAGE = process.env.WEBSERVER_IMAGE || 'isly-webserver:latest';

app.use(cors());
app.use(express.json());

const sessions = new Map();

function docker(args) {
  return new Promise((resolve, reject) => {
    execFile('docker', args, (err, stdout, stderr) => {
      if (err) return reject(stderr || err.message);
      resolve(stdout.trim());
    });
  });
}

app.post('/api/webserver/session', async (_, res) => {
  const id = randomUUID();
  const name = `webserver-${id}`;
  const port = 12000 + Math.floor(Math.random() * 4000);

  await docker([
    'run','-d','--rm',
    '--name', name,
    '--network','bridge',
    '-p', `${port}:7000`,
    '--memory','128m',
    '--memory-swap','128m',
    '--pids-limit','64',
    '--read-only',
    '--tmpfs','/tmp:rw,nosuid,nodev,noexec,size=16m',
    '--cap-drop','ALL',
    '--security-opt','no-new-privileges',
    IMAGE
  ]);

  sessions.set(id,{name,port});

  res.json({sessionId:id});
});

app.post('/api/webserver/request/:id', async (req,res)=>{
  const s=sessions.get(req.params.id);
  if(!s) return res.sendStatus(404);

  const method=req.body.method || 'GET';
  const path=req.body.path || '/';

  const response=await fetch(`http://host.docker.internal:${s.port}${path}`,{
    method
  });

  const body=await response.text();

  res.json({
    status:response.status,
    headers:Object.fromEntries(response.headers.entries()),
    body
  });
});

app.delete('/api/webserver/session/:id', async(req,res)=>{
  const s=sessions.get(req.params.id);
  if(s){
    await docker(['rm','-f',s.name]);
    sessions.delete(req.params.id);
  }
  res.sendStatus(204);
});

app.listen(PORT,()=>console.log(`Webserver backend on ${PORT}`));