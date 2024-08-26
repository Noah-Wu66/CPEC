import React, { useState, useEffect } from 'react'
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

const ButtonOption = ({ href, text, onClick }) => (
  <Link href={href}>
    <a className="w-full" onClick={onClick}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: '-100%' }}
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59,130,246,0.3)" }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex items-center justify-between w-80 py-4 px-6 bg-white bg-opacity-50 backdrop-blur-lg rounded-xl shadow-lg hover:bg-opacity-70 transition duration-100 ease-in-out group"
      >
        <span className="text-xl font-semibold">{text}</span>
        <ChevronRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-100" />
      </motion.div>
    </a>
  </Link>
)

export default function Component() {
  const [step, setStep] = useState(0)
  const [userType, setUserType] = useState(null)

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1000)
    const timer2 = setTimeout(() => setStep(2), 2000)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  const handleUserTypeSelect = (type) => (e) => {
    e.preventDefault()
    setUserType(type)
    setStep(3)
  }

  const pageVariants = {
    initial: { opacity: 0, x: '100%' },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: '-100%' }
  }

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: 0 }
  }

  const transition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 text-blue-800 overflow-hidden">
        <Particles />
        
        <AnimatePresence mode="wait">
          {step < 3 ? (
            <motion.div 
              key="page1"
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={transition}
            >
              <motion.div 
                className="flex flex-col items-center justify-center space-y-8"
                variants={contentVariants}
                initial="initial"
                animate="in"
                exit="out"
                transition={transition}
              >
                <motion.h1 
                  className="text-5xl font-bold text-center"
                >
                  欢迎使用<br />编辑组业务工作台
                </motion.h1>

                {step >= 1 && (
                  <motion.p
                    className="text-3xl font-light"
                  >
                    我是...
                  </motion.p>
                )}

                {step >= 2 && (
                  <motion.div
                    className="flex flex-col items-center space-y-4"
                  >
                    <ButtonOption href="#" text="普通用户" onClick={handleUserTypeSelect('normal')} />
                    <ButtonOption href="#" text="管理用户" onClick={handleUserTypeSelect('admin')} />
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="page2"
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={transition}
            >
              <motion.div 
                className="flex flex-col items-center justify-center space-y-8"
                variants={contentVariants}
                initial="initial"
                animate="in"
                exit="out"
                transition={transition}
              >
                <motion.h1 
                  className="text-5xl font-bold text-center"
                >
                  我是...<br />{userType === 'normal' ? '普通用户' : '管理用户'}
                </motion.h1>

                <motion.p
                  className="text-3xl font-light"
                >
                  我想...
                </motion.p>

                <motion.div
                  className="flex flex-col items-center space-y-4"
                >
                  {userType === 'normal' ? (
                    <>
                      <ButtonOption href="#" text="查询个人信息" />
                      <ButtonOption href="#" text="查询每月排班" />
                      <ButtonOption href="#" text="访问软件大全" />
                    </>
                  ) : (
                    <>
                      <ButtonOption href="#" text="管理个人信息" />
                      <ButtonOption href="#" text="管理每月排班" />
                      <ButtonOption href="#" text="访问软件大全" />
                    </>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  )
}
