import { motion } from "framer-motion";

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.05 } },
};

const PageTransition = ({ children }) => {
    return (
        <motion.section
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            style={{ display: "flex", width: "100%", justifyContent: "center" }} // Não bagunça o layout
        >
            {children}
        </motion.section>
    );
};

export default PageTransition;
