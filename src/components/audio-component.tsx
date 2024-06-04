"use client";

import { User2 } from "lucide-react";
import { useState } from "react";
import { transcriptions } from "@/lib/transcription";
import { cn } from "@/lib/utils";
import OpenAIsvg from "./openai";

export default function AudioComponent() {
  const [currentTime, setCurrentTime] = useState(0);

  const handleTimeUpdate = (
    event: React.SyntheticEvent<HTMLAudioElement, Event>
  ) => {
    const audioElement = event.target as HTMLAudioElement;
    if (audioElement) {
      setCurrentTime(audioElement.currentTime);
    }
  };

  const handleMoveToTime = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const content = target.textContent;
    const transcript = transcriptions.find((item) => item.content === content);
    if (transcript) {
      const audioElement = document.getElementById(
        "audioPlayer"
      ) as HTMLAudioElement;
      if (audioElement) {
        audioElement.currentTime = transcript.start;
        audioElement.play();
      }
    }
  };

  const currentTranscript = transcriptions.find(
    (item) => currentTime >= item.start && currentTime < item.end
  );

  return (
    <section className="flex flex-col gap-4 max-w-2xl mx-auto">
      <div className="flex-1 grid grid-cols-1 gap-4 mb-20">
        <div className="rounded-3xl p-4 md:p-6 shadow-lg overflow-auto space-y-2 bg-[#1E1E1E] mb-4">
          {transcriptions.map((item, index) => (
            <article key={index}>
              <p
                className={cn(
                  "text-xs text-muted-foreground",
                  item.role === "agent"
                    ? "text-left pl-[3px]"
                    : "text-right pr-2"
                )}
              >
                {item.role}
              </p>
              <div className="flex items-start gap-2">
                {item.role === "agent" && (
                  <OpenAIsvg className="size-10 shrink-0 mt-2 border rounded-full p-2" />
                )}

                <p
                  onClick={handleMoveToTime}
                  className={cn(
                    "py-2 md:px-4 px-2 rounded-2xl transition-all duration-500 md:max-w-[70%] text-balance md:text-pretty",
                    currentTranscript?.content === item.content
                      ? "bg-[#4f4f4f] text-white "
                      : "text-foreground",
                    item.role === "agent"
                      ? "md:text-left mr-auto"
                      : "text-right ml-auto"
                  )}
                >
                  {item.content}
                </p>
                {item.role === "user" && (
                  <User2 className="size-10 shrink-0 mt-2 border rounded-full p-2 border-neutral-600/10" />
                )}
              </div>
            </article>
          ))}
        </div>
        <aside className="fixed bottom-6 inset-x-4  max-w-2xl mx-auto  mt-6 bg-foreground rounded-3xl p-2 shadow-2xl drop-shadow-[0_25px_35px_rgba(0,0,0,0.70)]">
          <audio
            id="audioPlayer"
            controls
            src="/test.wav"
            className="w-full m-auto"
            onTimeUpdate={handleTimeUpdate}
          >
            Your browser does not support the <code>audio</code> element.
          </audio>
        </aside>
      </div>
    </section>
  );
}
