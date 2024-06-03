"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FormSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    company: z.string().optional(),
    message: z.string(),
})

export const ContactForm = () => {

    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            email: "",
            company: "",
            message: "",
        }
    });

    const {
        formState: { isSubmitting },
    } = form;

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                access_key: process.env.NEXT_PUBLIC_WEB3FORMS_PUBLIC_KEY,
                ...values,
            }),
        })
        const data = await res.json();
        if (data.success) {
            setIsSuccess(true);
            form.reset();
        }
    }

    return (
        <>
            <AnimatePresence mode="wait">
                {isSuccess ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col gap-4"
                    >
                        <motion.span
                            style={{ display: "inline-block" }}
                            animate={{ rotate: [0, 15, 0] }}
                            transition={{ type: "tween", duration: 1, repeat: Infinity }}
                            className="text-6xl w-min"
                        >
                            👋🏼
                        </motion.span>
                        <p className="text-4xl">Thank you for contacting me!</p>
                        <p className="text-muted-foreground">I'll get back to you as soon as possible.</p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                                <div className="flex flex-col gap-10">
                                    <div className="flex items-center gap-4">
                                        <h2>Drop me a line</h2>
                                        <motion.span
                                            style={{ display: "inline-block" }}
                                            animate={{ y: [0, -15, 0] }}
                                            transition={{ type: "tween", duration: 1, repeat: Infinity }}
                                            className="text-4xl w-min"
                                        >
                                            👇🏼
                                        </motion.span>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => ( 
                                                    <FormItem>
                                                        <FormLabel>Name*</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                placeholder="Your name..."
                                                                className="h-12 bg-background/25 border-muted-foreground/50"
                                                                required
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => ( 
                                                    <FormItem>
                                                        <FormLabel>Email*</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                placeholder="Your email..."
                                                                className="h-12 bg-background/25 border-muted-foreground/50"
                                                                required
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="company"
                                        render={({ field }) => ( 
                                            <FormItem>
                                                <FormLabel>Company</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Your company..."
                                                        className="flex-1 h-12 bg-background/25 border-muted-foreground/50"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => ( 
                                            <FormItem>
                                                <FormLabel>Message*</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        {...field}
                                                        placeholder="How can I help you?"
                                                        className="w-full bg-background/25 border-muted-foreground/50"
                                                        rows={5}
                                                        required
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        className="w-full h-12"
                                    >
                                        { !isSubmitting && "Send" }
                                        { isSubmitting && <Loader2 className="animate-spin" /> }
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}