"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./minimal.module.css";

const FILM = {
  // A frame from the film itself: a scientist at the mass spectrometer.
  poster: "/video/film-still.jpg",
  full: "/video/agile-film-clean.mp4",
  duration: "2:15",
};

/**
 * The company film as a still frame with a small play button; the full
 * film opens with sound in a dialog. No looping preview, no scroll growth.
 */
export function FilmBlock() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Stop the film however the dialog closes: button, Escape or backdrop.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const stop = () => videoRef.current?.pause();
    dialog.addEventListener("close", stop);
    return () => dialog.removeEventListener("close", stop);
  }, []);

  const open = () => {
    dialogRef.current?.showModal();
    videoRef.current?.play().catch(() => {});
  };

  return (
    <>
      <button
        type="button"
        className={styles.film}
        onClick={open}
        aria-haspopup="dialog"
        aria-label={`Watch the company film (${FILM.duration})`}
      >
        <Image
          src={FILM.poster}
          alt=""
          fill
          sizes="(min-width: 1180px) 1100px, 92vw"
          className={styles.filmPoster}
        />
        <span className={styles.filmPlay} aria-hidden="true">
          <svg viewBox="0 0 10 12" width="10" height="12">
            <path d="M0 0v12l10-6z" fill="currentColor" />
          </svg>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label="Company film"
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
      >
        <video
          ref={videoRef}
          className={styles.dialogVideo}
          src={FILM.full}
          poster={FILM.poster}
          controls
          playsInline
          preload="none"
        />
        <form method="dialog">
          <button type="submit" className={styles.dialogClose}>
            Close
          </button>
        </form>
      </dialog>
    </>
  );
}
