import { useState } from 'react';

const Quiz = () => {
  const questions = [
    { question: 'Would you enjoy analyzing data and logs to find potential security threats?', scoreKey: 'analyze', weight: 2 },
    { question: 'Would you like breaking into systems to find vulnerabilities?', scoreKey: 'break', weight: 3 },
    { question: 'Would you prefer following procedures and ensuring compliance?', scoreKey: 'follow', weight: 1 },
    { question: 'Would you be interested in designing and implementing security solutions?', scoreKey: 'design', weight: 3 },
    { question: 'Would you enjoy troubleshooting and resolving technical issues?', scoreKey: 'troubleshoot', weight: 2 },
    { question: 'Would you be excited by the idea of creating and managing security policies?', scoreKey: 'manage', weight: 2 },
    { question: 'Would you like conducting security audits and assessments?', scoreKey: 'audit', weight: 1 },
    { question: 'Would you prefer working with large data sets and performing detailed analysis?', scoreKey: 'data', weight: 2 },
    { question: 'Would you be interested in researching new and emerging cybersecurity threats?', scoreKey: 'research', weight: 3 },
    { question: 'Would you enjoy collaborating with teams to improve security posture?', scoreKey: 'collaborate', weight: 2 },
    { question: 'Would you be fascinated by reverse engineering and dissecting malware?', scoreKey: 'reverseengineer', weight: 3 },
    { question: 'Would you prefer roles that involve frequent communication with stakeholders?', scoreKey: 'communication', weight: 1 },
    { question: 'Would you be interested in automating security processes and workflows?', scoreKey: 'automation', weight: 2 },
    { question: 'Would you enjoy managing security operations and incident response?', scoreKey: 'operations', weight: 3 },
    { question: 'Would you be enthusiastic about compliance with industry standards and regulations?', scoreKey: 'compliance', weight: 1 },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({
    analyze: 0, break: 0, follow: 0, design: 0, troubleshoot: 0,
    manage: 0, audit: 0, data: 0, research: 0, collaborate: 0,
    reverseengineer: 0, communication: 0, automation: 0, operations: 0, compliance: 0
  });
  const [result, setResult] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const updatedScores = { ...scores };

    if (answer === 'yes') {
      updatedScores[currentQuestion.scoreKey] += currentQuestion.weight;
    } else if (answer === 'neutral') {
      updatedScores[currentQuestion.scoreKey] += currentQuestion.weight * 0.5; // Neutral answer gets partial points
    }

    setScores(updatedScores);

    const newProgress = ((currentQuestionIndex + 1) / questions.length) * 100;
    setProgress(newProgress);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const career = getCareerRecommendations(updatedScores);
      setResult(career);
    }
  };

  const getCareerRecommendations = (finalScores) => {
    const sortedScores = Object.entries(finalScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3); // Get top 3 scores

    const careerMap = {
      analyze: 'Security Analyst',
      break: 'Penetration Tester',
      follow: 'Governance, Risk, and Compliance Specialist',
      design: 'Security Engineer',
      troubleshoot: 'Security Operations Center Analyst',
      manage: 'Security Manager',
      audit: 'Security Auditor',
      data: 'Data Protection Officer',
      research: 'Threat Intelligence Analyst',
      collaborate: 'Security Consultant',
      reverseengineer: 'Malware Analyst',
      communication: 'Security Liaison',
      automation: 'Security Automation Engineer',
      operations: 'Incident Responder',
      compliance: 'Compliance Specialist'
    };

    return sortedScores.map(([key]) => careerMap[key] || 'Cybersecurity Generalist').join(', ');
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScores({
      analyze: 0, break: 0, follow: 0, design: 0, troubleshoot: 0,
      manage: 0, audit: 0, data: 0, research: 0, collaborate: 0,
      reverseengineer: 0, communication: 0, automation: 0, operations: 0, compliance: 0
    });
    setResult(null);
    setProgress(0);
    setQuizStarted(false);
  };

  return (
    <div>
      {!quizStarted ? (
        <div>
          <button
            onClick={() => setQuizStarted(true)}
            className="text-black rounded-full px-6 py-2 bg-white hover:animate-fadeAndZoom cursor-pointer text-lg"
          >
            Begin Questionnaire!
          </button>
        </div>
      ) : result ? (
        <div>
          <h2 style={{ color: 'white' }}>Your Recommended Careers:</h2>
          <p style={{ color: 'white' }}>{result}</p>
          <button
            onClick={resetQuiz}
            className="text-black rounded-full mt-5 px-6 py-2 bg-white hover:animate-fadeIn cursor-pointer text-lg">
            Retake Quiz
          </button>
        </div>
      ) : (
        <div>
          <p style={{ color: 'white' }}>{`Question ${currentQuestionIndex + 1} of ${questions.length}`}</p>
          <p style={{ color: 'white' }}>{questions[currentQuestionIndex].question}</p>
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => handleAnswer('yes')}
              className="text-black rounded-full px-6 py-4 mr-3 bg-white cursor-pointer text-lg"
            >
              Yes
            </button>
            <button
              onClick={() => handleAnswer('neutral')}
              className="text-black rounded-full px-6 py-4 mr-3 bg-white cursor-pointer text-lg"
            >
              Neutral
            </button>
            <button
              onClick={() => handleAnswer('no')}
              className="text-black rounded-full px-6 py-4 bg-white cursor-pointer text-lg"
            >
              No
            </button>
          </div>
          <p style={{ color: 'white', marginTop: '20px' }}>Progress: {Math.round(progress)}%</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
