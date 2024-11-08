"use client";

import { convertNumberToWords } from "@/utils";
import { CheckCheck as CorrectIcon, X as WrongIcon } from "lucide-react";
import React, { useState } from "react";

interface CorrectOrWrongIconProps {
  showRight: boolean;
  showWrong: boolean;
  successRate: number;
}

interface CorrectAnswerExplainationProps {
  answerExplaination?: string;
  isSelected?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const postQuizDetails = {
  options: [
    {
      text: "Berlin",
      isCorrectAnswer: false,
      totalUsers: 2, // Number of participants for this option
      successRate: 25.0, // Calculated success rate
    },
    {
      text: "Madrid",
      isCorrectAnswer: false,
      totalUsers: 1,
      successRate: 12.5,
    },
    {
      text: "Paris",
      isCorrectAnswer: true,
      correctAnswerExplaination:
        "Paris is the correct answer. It is the capital of France.",
      totalUsers: 3,
      successRate: 62.5,
    },
    {
      text: "Rome",
      isCorrectAnswer: false,
      totalUsers: 0,
      successRate: 0.0,
    },
  ],
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const totalResponse = 6;

const CommunityPostQuiz = () => {
  const [mySelection, setMySelection] = useState<number | null>(null);

  const totalAnswers = convertNumberToWords(totalResponse);

  const { options } = postQuizDetails;

  /* check that is there any option selected */
  const isSelected = mySelection !== null;

  /* find correct answer index */
  const correctAnswerIndex = options.findIndex(
    ({ isCorrectAnswer }) => isCorrectAnswer
  );

  /* find correct answer explaination */
  const correctAnswerExplaination = (options[correctAnswerIndex] || {})[
    "correctAnswerExplaination"
  ];

  const handleSelectOption = (index: number) => () => {
    /* if selected option is already selected then unselect it */
    if (mySelection === index) return setMySelection(null);

    return setMySelection(index);
  };

  return (
    <div className="flex flex-col gap-3.5">
      <p className="text-sm text-gray-500">{totalAnswers} answered</p>
      <div className="flex flex-col gap-3">
        {options.map(({ text, isCorrectAnswer, successRate }, id) => {
          /* round the successRate to show */
          successRate = Math.round(successRate);

          /* check current option is selected or not */
          const isCurrentOptionSelected = mySelection === id;
          
          /* if any option is selected and that is correct option then showRight */
          const showRight = isSelected && isCorrectAnswer;
          
          /* if that option is selected and option is not correct then showWrong */
          const showWrong = isCurrentOptionSelected && !isCorrectAnswer;
          
          /* determine border color
            - if showWrong then border color red
            - if current option is selected and that is correct option then border color green
          */
          const answerShowingClasses =
            `${showRight && isCurrentOptionSelected ? "border-green-500" : ""} ${
              showWrong ? "border-red-500" : ""
            }` || "border-accent";

          return (
            <div
              key={id}
              className={`relative w-full p-2 rounded-sm border flex justify-between items-center cursor-pointer ${answerShowingClasses}`}
              onClick={handleSelectOption(id)}
            >
              {isSelected && (
                <span
                  className={`absolute left-0 top-0 h-full bg-gray-500/10`}
                  style={{
                    width: `${successRate}%`,
                  }}
                ></span>
              )}
              <p className="flex-1 text-sm">{text}</p>
              {(showRight || showWrong) && (
                <CorrectOrWrongIcon
                  showRight={showRight}
                  showWrong={showWrong}
                  successRate={successRate}
                />
              )}
            </div>
          );
        })}
      </div>

      <CorrectAnswerExplaination
        answerExplaination={correctAnswerExplaination}
        isSelected={isSelected}
      />
    </div>
  );
};

const CorrectOrWrongIcon = ({
  showRight = false,
  showWrong = false,
  successRate = 0,
}: CorrectOrWrongIconProps) => {
  const bgColor = `${showRight ? "bg-green-500" : ""} ${
    showWrong ? "bg-red-500" : ""
  }`;

  return (
    <div className="flex justify-center items-center gap-1.5">
      <span className="text-sm text-gray-500">{successRate}%</span>
      <span
        className={`${bgColor} aspect-square rounded-full flex-shrink-0 size-5 grid place-items-center`}
      >
        {showRight && <CorrectIcon size={18} className="text-white" />}
        {showWrong && <WrongIcon size={18} className="text-white" />}
      </span>
    </div>
  );
};

const CorrectAnswerExplaination = ({
  answerExplaination,
  isSelected = false,
}: CorrectAnswerExplainationProps) => {
  return (
    <>
      {/* if there any option selected and answerExplaination exist then show currect ans */}
      {isSelected && answerExplaination && (
        <div className="flex flex-col gap-2 p-2 bg-gray-500/10 rounded-sm">
          <h5 className="text-sm font-semibold">Explanation</h5>
          <p className="text-sm leading-relaxed">{answerExplaination}</p>
        </div>
      )}
    </>
  );
};

export default CommunityPostQuiz;
