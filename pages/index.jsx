'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { ErrorBoundary } from 'react-error-boundary'

const Particles = () => {
  const [particleCount, setParticleCount] = useState(25)

  useEffect(() => {
    setParticleCount(window.innerWidth > 768 ? 50 : 25)
  }, [])

  const particles = React.useMemo(
    () =>
      Array.from({ length: particleCount }, () => ({
        width: Math.random() * 5 + 1,
        height: Math.random() * 5 + 1,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        y: [0, Math.random() * 100 - 50],
        duration: Math.random() * 5 + 5,
      })),
    [particleCount]
  )

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-100 rounded-full"
          style={{
            width: particle.width,
            height: particle.height,
            top: particle.top,
            left: particle.left,
          }}
          animate={{
            y: particle.y,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="text-red-500">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

const ButtonOption = ({ href, text, onClick }) => (
  <Link href={href} onClick={onClick} className="w-full">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: '-100%' }}
      whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59,130,246,0.3)' }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="flex items-center justify-between w-80 py-4 px-6 bg-white bg-opacity-50 backdrop-blur-lg rounded-xl shadow-lg hover:bg-opacity-70 transition duration-100 ease-in-out group"
    >
      <span className="text-xl font-semibold">{text}</span>
      <ChevronRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-100" />
    </motion.div>
  </Link>
)

export default function Component() {
  const [step, setStep] = useState(0)
  const [userType, setUserType] = useState(null)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const savedUserType = localStorage.getItem('userType')
    if (savedUserType) {
      setUserType(savedUserType)
      setStep(3)
    } else {
      const timer1 = setTimeout(() => setStep(1), 1000)
      const timer2 = setTimeout(() => setStep(2), 2000)
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [])

  const handleUserTypeSelect = (type) => (e) => {
    e.preventDefault()
    setUserType(type)
    setStep(3)
    setDirection(1)
    localStorage.setItem('userType', type)
  }

  const handleBackToUserTypeSelection = () => {
    setStep(2)
    setUserType(null)
    setDirection(-1)
    localStorage.removeItem('userType')
  }

  const pageVariants = {
    initial: (custom) => ({
      opacity: 0,
      x: custom * 100 + '%',
      scale: custom === 0 ? 0.8 : 1,
    }),
    in: { opacity: 1, x: 0, scale: 1 },
    out: (custom) => ({
      opacity: 0,
      x: custom * -100 + '%',
      transition: { type: 'tween', ease: 'easeInOut', duration: 0.3 },
    }),
  }

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: (custom) => ({
      opacity: 0,
      x: custom * -100 + '%',
      transition: { duration: 0.3, ease: 'easeInOut' },
    }),
  }

  const userOptions = [
    { value: 'normal', text: '普通用户' },
    { value: 'admin', text: '管理用户' },
  ]

  const actions = {
    normal: [
      {
        href: 'https://sw8do1frcg1.feishu.cn/docx/Nqm2dRfEwoo9rgxB0GYckYRjn1e?from=from_copylink',
        text: '维护用户信息',
      },
      {
        href: 'https://sw8do1frcg1.feishu.cn/docx/JZmedJXMhoBRF7xAaYvcgQ8bnEU?from=from_copylink',
        text: '查询每月排班',
      },
      {
        href: 'https://sw8do1frcg1.feishu.cn/docx/BFdKdJS8NoIreTxPRbAcYnvhnVc?from=from_copylink',
        text: '查询质检积分',
      },
    ],
    admin: [
      {
        href: 'https://sw8do1frcg1.feishu.cn/docx/ABVfdd5qBo5dGUxolK7c4ZKSnue?from=from_copylink',
        text: '管理用户信息',
      },
      {
        href: 'https://sw8do1frcg1.feishu.cn/docx/QkJrd4ztzobsF4xN4XRcnpHrnbf?from=from_copylink',
        text: '管理每月排班',
      },
      {
        href: 'https://sw8do1frcg1.feishu.cn/docx/CSwwdksjgohxYSxOA4BcGEYtnwh?from=from_copylink',
        text: '管理质检积分',
      },
      {
        href: 'https://sw8do1frcg1.feishu.cn/docx/WkswdcWaeoVDPhx3eDwcoe8Unxg?from=from_copylink',
        text: '管理每月绩效',
      },
    ],
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 text-blue-800 overflow-hidden">
        <Particles />

        <AnimatePresence mode="wait" custom={direction}>
          {step < 3 ? (
            <motion.div
              key="page1"
              className="flex flex-col items-center justify-center space-y-8"
              custom={direction}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              onAnimationComplete={() => setDirection(1)}
            >
              <motion.h1
                variants={itemVariants}
                className="text-5xl font-bold text-center"
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                欢迎使用<br />编辑组业务工作台
              </motion.h1>

              {step >= 1 && (
                <motion.p
                  variants={itemVariants}
                  className="text-3xl font-light"
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  我是...
                </motion.p>
              )}

              {step >= 2 && (
                <motion.div
                  className="flex flex-col items-center space-y-4"
                  variants={itemVariants}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  {userOptions.map((option) => (
                    <ButtonOption
                      key={option.value}
                      href="#"
                      text={option.text}
                      onClick={handleUserTypeSelect(option.value)}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="page2"
              className="flex flex-col items-center justify-center space-y-8"
              custom={direction}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <motion.h1
                className="text-5xl font-bold text-center"
                variants={itemVariants}
                transition={{ delay: 0.2 }}
              >
                我是...<br />
                {userType === 'normal' ? '普通用户' : '管理用户'}
              </motion.h1>

              <motion.p
                className="text-3xl font-light"
                variants={itemVariants}
                transition={{ delay: 0.3 }}
              >
                我想...
              </motion.p>

              <motion.div
                className="flex flex-col items-center space-y-4"
                variants={itemVariants}
                transition={{ delay: 0.4 }}
              >
                {actions[userType].map((action) => (
                  <ButtonOption
                    key={action.text}
                    href={action.href}
                    text={action.text}
                  />
                ))}
                <ButtonOption
                  href="#"
                  text="返回身份选择"
                  onClick={handleBackToUserTypeSelection}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  )
}
