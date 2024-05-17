import { motion } from 'framer-motion';

export const RevealText = ({
    value,
}: {
    value: string;
}) => {

    const words = value.split(" ");

    return (
        <div className="flex w-full h-full items-center justify-center">
            <div className="relative w-full h-full text-4xl">
                <p className="absolute top-96 left-48 opacity-50">{value}</p>
                <div className="absolute top-96 left-48">
                    {words.map((word, i) => (
                        <motion.span 
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            {word}{` `}
                        </motion.span>
                    ))} 
                </div>
            </div>
        </div>
    )
}