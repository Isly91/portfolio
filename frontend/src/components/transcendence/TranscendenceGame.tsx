"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Vector2 = {
  x: number;
  y: number;
};

type Difficulty = "easy" | "hard";
type GamePhase = "normal" | "overtime";
type GameState = "pre-game" | "playing" | "paused";

type Props = {
  difficulty: Difficulty;
};

export default function TranscendenceGame({ difficulty }: Props) {
	
  const [leftPaddleY, setLeftPaddleY] = useState(250);
  const [rightPaddleY, setRightPaddleY] = useState(250);

  const [ballPosition, setBallPosition] = useState<Vector2>({
    x: 400,
    y: 300,
  });

  const [ballVelocity, setBallVelocity] = useState<Vector2>({
    x: 5,
    y: 3,
  });

  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);

  const [gameState, setGameState] =
    useState<GameState>("pre-game");

  const [gamePhase, setGamePhase] =
    useState<GamePhase>("normal");

  const [timeRemaining, setTimeRemaining] = useState(120);

  const [gameEnded, setGameEnded] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const [ballColor, setBallColor] = useState("#fff");
  const [isColliding, setIsColliding] = useState(false);

  const boardRef = useRef<HTMLDivElement>(null);
  const gameLoopRef = useRef<number>(0);
  const keysRef = useRef<Set<string>>(new Set());
  const scoringRef = useRef(false);

  const WINNING_SCORE_NORMAL = 11;
  const WINNING_SCORE_OVERTIME = 2;
  const GAME_DURATION = 120;

  const router = useRouter();

  const difficultySettings = {
    easy: {
      ballSpeed: {
        initial: 7,
        max: 19,
      },
      ballAcceleration: 1.05,
      aiSpeed: 6,
      aiReactionDelay: 0.6,
      aiPredictionError: 20,
    },

    hard: {
      ballSpeed: {
        initial: 11,
        max: 19,
      },
      ballAcceleration: 1.1,
      aiSpeed: 6,
      aiReactionDelay: 1.5,
      aiPredictionError: 75,
    },
  };

  const settings = difficultySettings[difficulty];

  const [dimensions, setDimensions] = useState({
    width: 1000,
    height: 600,
  });

  useEffect(() => {
    const board = boardRef.current;

    if (!board) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width: boardWidth, height: boardHeight } = entry.contentRect;

      setDimensions({
        width: Math.max(1, boardWidth),
        height: Math.max(1, boardHeight),
      });
    });

    resizeObserver.observe(board);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const { width, height } = dimensions;
  const PADDLE_BORDER = Math.max(12, width * 0.024);
  const PADDLE_HEIGHT = Math.max(72, height * 0.21);
  const PADDLE_WIDTH = Math.max(6, width * 0.012);
  const BALL_SIZE = Math.max(12, width * 0.02);
  const PADDLE_SPEED = Math.max(8, height * 0.027);
  

  const resetBall = () => {
    setBallPosition({
      x: width / 2,
      y: height / 2,
    });

    setBallVelocity({
      x:
        Math.random() > 0.5
          ? settings.ballSpeed.initial
          : -settings.ballSpeed.initial,
      y: (Math.random() - 0.5) * 6,
    });

    setBallColor("#fff");
  };

  const startGame = () => {
    scoringRef.current = false;
    setLeftScore(0);
    setRightScore(0);

    setLeftPaddleY(height / 2 - PADDLE_HEIGHT / 2);
    setRightPaddleY(height / 2 - PADDLE_HEIGHT / 2);

    setGamePhase("normal");
    setTimeRemaining(GAME_DURATION);

    setGameEnded(false);
    setWinner(null);

    resetBall();

    setGameState("playing");
  };

  const restartGame = () => {
    startGame();
  };

  const setKeyState = (key: string, isPressed: boolean) => {
    if (isPressed) {
      keysRef.current.add(key);
    } else {
      keysRef.current.delete(key);
    }
  };

  /*
   * Keyboard controls
   */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "ArrowUp" ||
        event.key === "ArrowDown"
      ) {
        event.preventDefault();
        keysRef.current.add(event.key);
      }

      if (event.key === " ") {
        event.preventDefault();

        setGameState((state) => {
          if (state === "playing") return "paused";

          if (state === "paused") return "playing";

          return state;
        });
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      keysRef.current.delete(event.key);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  /*
   * Main game loop
   */
  useEffect(() => {
    if (gameState !== "playing") {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }

      return;
    }

    const gameLoop = () => {
      /*
       * PLAYER
       */
      setLeftPaddleY((previous) => {
        let next = previous;

        if (keysRef.current.has("ArrowUp")) {
          next = Math.max(
            0,
            previous - PADDLE_SPEED
          );
        }

        if (keysRef.current.has("ArrowDown")) {
          next = Math.min(
            height - PADDLE_HEIGHT,
            previous + PADDLE_SPEED
          );
        }

        return next;
      });

      /*
       * AI
       */
      setRightPaddleY((previous) => {
        if (ballVelocity.x <= 0) {
          return previous;
        }

        const timeToReachPaddle =
          (width -
            PADDLE_BORDER -
            PADDLE_WIDTH -
            ballPosition.x) /
          Math.abs(ballVelocity.x);

        const predictedBallY =
          ballPosition.y +
          ballVelocity.y * timeToReachPaddle;

        const error =
          (Math.random() - 0.5) *
          settings.aiPredictionError;

        const targetY =
          predictedBallY + error;

        const ballCenter =
          targetY + BALL_SIZE / 2;

        const paddleCenter =
          previous + PADDLE_HEIGHT / 2;

        const distance =
          ballCenter - paddleCenter;

        const movement =
          distance * settings.aiReactionDelay;

        if (Math.abs(movement) <= 10) {
          return previous;
        }

        if (movement > 0) {
          return Math.min(
            height - PADDLE_HEIGHT,
            previous + settings.aiSpeed
          );
        }

        return Math.max(
          0,
          previous - settings.aiSpeed
        );
      });

      /*
       * BALL
       */
      setBallPosition((previous) => {
        const next = {
          x: previous.x + ballVelocity.x,
          y: previous.y + ballVelocity.y,
        };

        /*
         * Top / bottom
         */
        if (next.y <= 0) {
          next.y = 0;

          setBallVelocity((velocity) => ({
            ...velocity,
            y: Math.abs(velocity.y),
          }));
        }

        if (next.y >= height - BALL_SIZE) {
          next.y = height - BALL_SIZE;

          setBallVelocity((velocity) => ({
            ...velocity,
            y: -Math.abs(velocity.y),
          }));
        }

        /*
         * PLAYER COLLISION
         */
        if (
          next.x <=
            PADDLE_BORDER + PADDLE_WIDTH &&
          next.y + BALL_SIZE >= leftPaddleY &&
          next.y <=
            leftPaddleY + PADDLE_HEIGHT
        ) {
          setBallVelocity((velocity) => {
            const newX =
              Math.abs(velocity.x) *
              settings.ballAcceleration;

            const newY =
              velocity.y *
              settings.ballAcceleration;

            return {
              x: Math.min(
                newX,
                settings.ballSpeed.max
              ),

              y: Math.max(
                Math.min(
                  newY,
                  settings.ballSpeed.max
                ),
                -settings.ballSpeed.max
              ),
            };
          });

          next.x =
            PADDLE_BORDER + PADDLE_WIDTH;

          setIsColliding(true);
          setBallColor("#00ff7f");

          window.setTimeout(
            () => setIsColliding(false),
            100
          );
        }

        /*
         * AI COLLISION
         */
        if (
          next.x + BALL_SIZE >=
            width -
              PADDLE_BORDER -
              PADDLE_WIDTH &&
          next.y + BALL_SIZE >= rightPaddleY &&
          next.y <=
            rightPaddleY + PADDLE_HEIGHT
        ) {
          setBallVelocity((velocity) => {
            const newX =
              -Math.abs(velocity.x) *
              settings.ballAcceleration;

            const newY =
              velocity.y *
              settings.ballAcceleration;

            return {
              x: Math.max(
                newX,
                -settings.ballSpeed.max
              ),

              y: Math.max(
                Math.min(
                  newY,
                  settings.ballSpeed.max
                ),
                -settings.ballSpeed.max
              ),
            };
          });

          next.x =
            width -
            PADDLE_BORDER -
            PADDLE_WIDTH -
            BALL_SIZE;

          setIsColliding(true);
          setBallColor("#ff6600");

          window.setTimeout(
            () => setIsColliding(false),
            100
          );
        }

        /*
         * AI SCORES
         */
        if (next.x < 0) {
          if (scoringRef.current) {
            return {
              x: width / 2,
              y: height / 2,
            };
          }

          scoringRef.current = true;
          setRightScore((score) => score + 1);

          resetBall();

          window.setTimeout(() => {
            scoringRef.current = false;
          }, 100);

          return {
            x: width / 2,
            y: height / 2,
          };
        }

        /*
         * PLAYER SCORES
         */
        if (next.x > width) {
          if (scoringRef.current) {
            return {
              x: width / 2,
              y: height / 2,
            };
          }

          scoringRef.current = true;
          setLeftScore((score) => score + 1);

          resetBall();

          window.setTimeout(() => {
            scoringRef.current = false;
          }, 100);

          return {
            x: width / 2,
            y: height / 2,
          };
        }

        return next;
      });

      gameLoopRef.current =
        requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current =
      requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [
    gameState,
    ballPosition,
    ballVelocity,
    leftPaddleY,
    rightPaddleY,
    width,
    height,
    settings,
  ]);

  /*
   * Timer
   */
  useEffect(() => {
    if (
      gameState !== "playing" ||
      gameEnded
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setTimeRemaining((previous) => {
        if (previous <= 1) {
          if (gamePhase === "normal") {
            if (leftScore === rightScore) {
              setGamePhase("overtime");

              setLeftScore(0);
              setRightScore(0);

              resetBall();

              return 999;
            }

            const playerWon =
              leftScore > rightScore;

            setWinner(
              playerWon
                ? "YOU WIN"
                : "YOU LOST"
            );

            setGameEnded(true);
            setGameState("paused");

            return 0;
          }

          return previous;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [
    gameState,
    gameEnded,
    gamePhase,
    leftScore,
    rightScore,
  ]);

  /*
   * Score win condition
   */
  useEffect(() => {
    if (gameEnded) return;

    const winningScore =
      gamePhase === "normal"
        ? WINNING_SCORE_NORMAL
        : WINNING_SCORE_OVERTIME;

    if (
      leftScore >= winningScore ||
      rightScore >= winningScore
    ) {
      const playerWon =
        leftScore >= winningScore;

      setWinner(
        playerWon
          ? "YOU WIN"
          : "YOU LOST"
      );

      setGameEnded(true);
      setGameState("paused");
    }
  }, [
    leftScore,
    rightScore,
    gamePhase,
    gameEnded,
  ]);

  const minutes = Math.floor(
    timeRemaining / 60
  );

  const seconds = timeRemaining % 60;

  const formattedTime =
    gamePhase === "overtime"
      ? "OVERTIME"
      : `${minutes}:${seconds
          .toString()
          .padStart(2, "0")}`;

  return (
    <div
      ref={boardRef}
      className="relative h-[100svh] min-h-0 w-full max-w-[1400px] overflow-hidden bg-black text-white md:mx-auto"
    >
		<button
		  onClick={() => router.push("/#projects")}
		  aria-label="Back to portfolio"
		  className="absolute left-6 top-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-xl text-white backdrop-blur-md transition hover:bg-white hover:text-black">
		  ←
		</button>

      {/* GAME FIELD */}

      <div className="absolute inset-0">

        {/* Center line */}

        <div
          className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, #555 0px, #555 15px, transparent 15px, transparent 30px)",
          }}
        />

        {/* Timer */}

        <div
          className={`absolute left-1/2 top-6 z-20 -translate-x-1/2 rounded-lg border px-5 py-2 font-mono text-xl font-bold ${
            gamePhase === "overtime"
              ? "border-red-500 text-red-500"
              : "border-yellow-400 text-yellow-400"
          }`}
        >
          {formattedTime}
        </div>

        {/* Score */}

        <div className="absolute left-1/2 top-24 z-20 flex w-64 -translate-x-1/2 justify-between font-mono text-3xl font-bold">

          <span className="text-yellow-400">
            {leftScore
              .toString()
              .padStart(2, "0")}
          </span>

          <span className="text-yellow-400">
            {rightScore
              .toString()
              .padStart(2, "0")}
          </span>

        </div>

        {/* Difficulty */}

        <div className="absolute right-6 top-6 z-20 rounded-lg border border-yellow-400 px-4 py-2 text-sm font-bold text-yellow-400">
          {difficulty.toUpperCase()}
        </div>

        {/* Player paddle */}

        <div
          className="absolute rounded-sm bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
          style={{
            left: PADDLE_BORDER,
            top: leftPaddleY,
            width: PADDLE_WIDTH,
            height: PADDLE_HEIGHT,
            backgroundColor: isColliding
              ? "#00f"
              : "#fff",
          }}
        />

        {/* AI paddle */}

        <div
          className="absolute rounded-sm bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
          style={{
            right: PADDLE_BORDER,
            top: rightPaddleY,
            width: PADDLE_WIDTH,
            height: PADDLE_HEIGHT,
            backgroundColor: isColliding
              ? "#f00"
              : "#fff",
          }}
        />

        {/* Ball */}

        <div
          className="absolute rounded-full transition-colors duration-300"
          style={{
            left: ballPosition.x,
            top: ballPosition.y,
            width: BALL_SIZE,
            height: BALL_SIZE,
            backgroundColor: ballColor,
            boxShadow: `0 0 20px ${ballColor}`,
          }}
        />

      </div>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3 md:hidden">
        <button
          type="button"
          aria-label="Move paddle up"
          className="h-14 w-20 rounded-lg border border-white/30 bg-white/10 text-2xl text-white active:bg-yellow-400 active:text-black"
          onPointerDown={() => setKeyState("ArrowUp", true)}
          onPointerUp={() => setKeyState("ArrowUp", false)}
          onPointerLeave={() => setKeyState("ArrowUp", false)}
          onPointerCancel={() => setKeyState("ArrowUp", false)}
        >
          &#8593;
        </button>
        <button
          type="button"
          aria-label="Move paddle down"
          className="h-14 w-20 rounded-lg border border-white/30 bg-white/10 text-2xl text-white active:bg-yellow-400 active:text-black"
          onPointerDown={() => setKeyState("ArrowDown", true)}
          onPointerUp={() => setKeyState("ArrowDown", false)}
          onPointerLeave={() => setKeyState("ArrowDown", false)}
          onPointerCancel={() => setKeyState("ArrowDown", false)}
        >
          &#8595;
        </button>
      </div>

      {/* PRE GAME */}

      {gameState === "pre-game" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/85">

          <div className="w-[min(90%,420px)] rounded-2xl border border-yellow-400 bg-zinc-900 p-10 text-center">

            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
              Transcendence
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              Singleplayer
            </h2>

            <p className="mt-5 text-gray-400">
              You vs AI
            </p>

            <div className="mt-8 space-y-2 text-sm text-gray-400">
              <p>↑ / ↓ — Move paddle</p>
              <p>SPACE — Pause</p>
            </div>

            <button
              onClick={startGame}
              className="mt-8 rounded-full bg-yellow-400 px-8 py-3 font-bold text-black transition hover:bg-yellow-300"
            >
              START GAME
            </button>

          </div>

        </div>
      )}

      {/* PAUSED */}

      {gameState === "paused" &&
        !gameEnded &&
        (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70">

            <div className="rounded-2xl border border-yellow-400 bg-zinc-900 px-12 py-10 text-center">

              <h2 className="text-4xl font-bold text-yellow-400">
                PAUSED
              </h2>

              <p className="mt-4 text-gray-400">
                Press SPACE to continue
              </p>

            </div>

          </div>
        )}

      {/* GAME OVER */}

      {gameEnded && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/90">

          <div className="w-[min(90%,500px)] rounded-2xl border border-yellow-400 bg-zinc-900 p-12 text-center">

            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
              Match finished
            </p>

            <h2 className="mt-4 text-5xl font-bold text-yellow-400">
              {winner}
            </h2>

            <div className="mt-8 font-mono text-3xl">
              {leftScore} — {rightScore}
            </div>

            <div className="mt-10 flex justify-center gap-4">

              <button
                onClick={restartGame}
                className="rounded-full bg-yellow-400 px-7 py-3 font-bold text-black transition hover:bg-yellow-300"
              >
                PLAY AGAIN
              </button>

              <a
                href="/#projects"
                className="rounded-full border border-gray-700 px-7 py-3 transition hover:bg-white hover:text-black"
              >
                EXIT
              </a>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
