"use client";

import React, {
  ChangeEvent,
  FocusEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DeleteIcon } from "@/lib/icons";
import {
  changePollQuizOption,
  deletePollQuizOption,
} from "@/redux/features/create-community-post/createCommunityPostSlice";
import { useAppDispatch } from "@/redux/hooks";
import OptionLimit from "@/app/studio/create-community-post/_components/ContextBasedCanvas/PollQuiz/OptionLimit";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { cn } from "@/lib/utils";
import AnimatedWrapper from "@/app/studio/create-community-post/_components/AnimatedWrapper";

interface QuizOptionProp {
  id: string;
  text: string;
  isCorrectAnswer?: boolean;
  correctAnswerExplaination?: string;
}

const QuizOption = memo(
  ({
    id,
    text = "",
    isCorrectAnswer = false,
    correctAnswerExplaination = "",
  }: QuizOptionProp) => {
    const [optionText, setOptionText] = useState<string>(text);
    const [
      optionCorrectAnswerExplaination,
      setOptionCorrectAnswerExplaination,
    ] = useState<string>(correctAnswerExplaination);
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (optionText === text) return;

      setOptionText(text);
    }, [text]);

    useEffect(() => {
      if (optionCorrectAnswerExplaination === correctAnswerExplaination) return;

      setOptionCorrectAnswerExplaination(correctAnswerExplaination);
    }, [correctAnswerExplaination]);

    const handleTextChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => setOptionText(e.target.value),
      []
    );

    const handleTextBlur = useCallback(
      (e: FocusEvent<HTMLInputElement>) =>
        dispatch(
          changePollQuizOption({
            id,
            text: e.target.value,
          })
        ),
      []
    );

    const handleCorrectAnswerChange = useCallback(
      (e: ChangeEvent<HTMLTextAreaElement>) =>
        setOptionCorrectAnswerExplaination(e.target.value),
      []
    );

    const handleCorrectAnswerBlur = useCallback(
      (e: FocusEvent<HTMLTextAreaElement>) =>
        dispatch(
          changePollQuizOption({
            id,
            correctAnswerExplaination: e.target.value,
          })
        ),
      []
    );

    const handleSelectCorrectAns = useCallback(
      (e: ChangeEvent<HTMLInputElement>) =>
        dispatch(
          changePollQuizOption({
            id,
            isCorrectAnswer: e.target.checked,
          })
        ),
      []
    );

    const handleDelete = useCallback(
      () =>
        dispatch(
          deletePollQuizOption({
            id,
          })
        ),
      []
    );

    return (
      <div className="w-full flex-col gap-1.5 items-center px-0.5 border-b">
        <div className="w-full flex gap-2 items-center">
          <div className="p-1 flex-shrink-0 flex justify-center items-center">
            <input
              type="radio"
              id={`quiz-${id}`}
              name="quiz-option"
              onChange={handleSelectCorrectAns}
              hidden
            />
            <label
              htmlFor={`quiz-${id}`}
              role="radio"
              aria-checked={isCorrectAnswer}
              aria-label={`Mark option ${optionText || id} as correct answer`}
              tabIndex={0}
              className={cn(
                "inline-block w-[12px] h-[12px] rounded-full flex-shrink-0 ring-[1.5px] ring-primary ring-offset-2 cursor-pointer transition-all duration-100",
                {
                  "bg-primary": isCorrectAnswer,
                  "bg-transparent": !isCorrectAnswer,
                }
              )}
            ></label>
          </div>

          <Input
            value={optionText}
            onChange={handleTextChange}
            onBlur={handleTextBlur}
            className="w-full border-none px-2"
          />
          <OptionLimit value={optionText.length ?? 0} limit={80} />
          <Button
            variant={"ghost"}
            size={"smIcon"}
            className="rounded-full flex-shrink-0"
            onClick={handleDelete}
          >
            <DeleteIcon size={16} />
          </Button>
        </div>
        <AnimatedWrapper
          keyName="clear-button"
          direction="left"
          show={Boolean(isCorrectAnswer)}
        >
          <div className="w-full">
            <AutosizeTextarea
              value={optionCorrectAnswerExplaination}
              placeholder="Explain why this is correct (optional)"
              className="w-full h-full border-none focus-visible:ring-0 rounded-none resize-none text-sm px-0 text-foreground/80"
              onChange={handleCorrectAnswerChange}
              onBlur={handleCorrectAnswerBlur}
            />
          </div>
        </AnimatedWrapper>
      </div>
    );
  }
);

export default QuizOption;
