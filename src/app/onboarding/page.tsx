"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel";
import Step1 from "../components/Step-1";
import { buttonVariants } from "@/components/ui/button";
import Step2 from "../components/Step-2";
import Step3 from "../components/Step-3";
import Link from "next/link";

function onboarding() {
  return (
    <div className="page-pink items-center">
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

        <div className="flex h-full justify-around items-center  ">
          <Link
            href={"/prelogin"}
            className={buttonVariants({
              class: "text-white",
              variant: "ghost",
            })}
          >
            Saltar
          </Link>

          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
}

export default onboarding;
