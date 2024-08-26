"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { ErrorBoundary } from 'react-error-boundary'

const Particles = () => {
  const [particleCount, setParticleCount] = useState(25);

  useEffect(() => {
    setParticleCount(window.innerWidth > 768 ? 50 : 25);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-100 rounded-full"
          style={{
            width: Math.random() * 5 + 1,
            height: Math.random() * 5 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert" className="text-red-500">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export default function Component() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1000)
    const timer2 = setTimeout(() => setStep(2), 2000)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 text-blue-800 overflow-hidden">
        <Particles />
        
        <motion.div 
          className="flex flex-col items-center justify-center space-y-8"
          layout
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <AnimatePresence>
            {step >= 0 && (
              <motion.h1 
                key="welcome"
                layout
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3 }}
                className="text-5xl font-bold text-center"
              >
                欢迎使用<br />中视前卫员工工作台
              </motion.h1>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 1 && (
              <motion.p
                key="iam"
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3 }}
                className="text-3xl font-light"
              >
                我是...
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 2 && (
              <motion.div
                key="options"
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3, staggerChildren: 0.1 }}
                className="flex flex-col items-center space-y-4"
              >
                <Link href="https://cpec.cc">
                  <a className="w-full">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59,130,246,0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.1 }}
                      className="flex items-center justify-between w-80 py-4 px-6 bg-white bg-opacity-50 backdrop-blur-lg rounded-xl shadow-lg hover:bg-opacity-70 transition duration-100 ease-in-out group"
                    >
                      <span className="text-xl font-semibold">职员老师</span>
                      <ChevronRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-100" />
                    </motion.div>
                  </a>
                </Link>
                <Link href="https://cpec2.cc">
                  <a className="w-full">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59,130,246,0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.1 }}
                      className="flex items-center justify-between w-80 py-4 px-6 bg-white bg-opacity-50 backdrop-blur-lg rounded-xl shadow-lg hover:bg-opacity-70 transition duration-100 ease-in-out group"
                    >
                      <span className="text-xl font-semibold">管理老师</span>
                      <ChevronRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-100" />
                    </motion.div>
                  </a>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </ErrorBoundary>
  )
}
