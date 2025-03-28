"use client";

import * as React from "react";
import { Moon, Sun } from 'lucide-react';
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ModeToggle() {
    const { setTheme, theme } = useTheme();

    return (
        <TooltipProvider>
            <Tooltip delayDuration={20}>
                <TooltipTrigger asChild>
                    <Button
                        className="rounded-full"
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    >
                        <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
                        <Moon className="hidden h-5 w-5 dark:block" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="left" align="center" sideOffset={5} className="bg-primary">
                    <p>
                        Change theme to {theme === "light" ? "dark" : "light"} mode
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
