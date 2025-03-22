"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import React from "react";

interface FloatingMessageProps {
    visible?: boolean
    onClose?: () => void
    dismissible?: boolean
    className?: string
    children: React.ReactNode
}

export function FloatingMessage({
                                    visible = true,
                                    onClose,
                                    dismissible = true,
                                    className,
                                    children
                                }: FloatingMessageProps) {
    const [isVisible, setIsVisible] = useState(visible)

    useEffect(() => {
        setIsVisible(visible)
    }, [visible])

    const handleClose = () => {
        setIsVisible(false)
        onClose?.()
    }

    if (!isVisible) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
            <Card className={cn("max-w-md shadow-lg", className)}>
                <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                        <div className="text-sm">{children}</div>
                        {dismissible && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 rounded-full -mr-2 -mt-2"
                                onClick={handleClose}
                                aria-label="Close"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}