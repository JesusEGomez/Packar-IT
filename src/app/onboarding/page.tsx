"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Step1 from "../components/Step-1";
import { Button } from "@/components/ui/button";
import Step2 from "../components/Step-2";
import Step3 from "../components/Step-3";

function onboarding() {
  return (
    <div className="page-pink">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <Step1 />
          </CarouselItem>
          <CarouselItem>
            <Step2 />
          </CarouselItem>
          <CarouselItem>
            <Step3 />
          </CarouselItem>
        </CarouselContent>

        <div className=" flex h-full align-bottom justify-between m-2  ">
          <Button variant={"ghost"} className="text-white">
            Saltar
          </Button>

          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
}

export default onboarding;
