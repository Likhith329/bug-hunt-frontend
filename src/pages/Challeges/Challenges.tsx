import { use, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../lib/api"
import Loader from "../../Components/Loader/Loader"
import styles from "./Challenges.module.css"
import Editor from "@monaco-editor/react";

const Challenges = () => {
  const {gameId} = useParams()
  const [isLoading, setLoader] = useState(true)
  const [challenge, setChallenge] = useState<any>({});
  const [code, setCode] = useState<any>('');
  const [playerId, setPlayerId] = useState<String | undefined>()
  const [results, setResults] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [allPassed, setAllPassed] = useState(false)
  

  useEffect(() => {
    let playerId = localStorage.getItem('playerId') 
    setPlayerId(playerId ?? undefined)
    getChallenge()
  }, [])

  const getChallenge = async() => {
    try {
      let res = await api.get(`/game/${gameId}`)
        setChallenge(res.data.currentChallenge)
      setCode(res.data.currentChallenge.buggyCode)
      setLoader(false)
    } catch (error) {
      setLoader(false)
    }
  }

  const handleSubmit = async(actionType: String) => {
    let payload = {
      playerId, 
      challengeId: challenge.id, 
      submittedCode: code.replace(/function\s+([a-zA-Z0-9_$]+)\s*\(/, 'function run('), 
      actionType
    }
    try {
      let res = await api.post('/challenge/submit', payload) 
      if (actionType === 'run') {
        setResults(res.data.testCases); // assuming backend sends test case results
      }
      setAllPassed(res.data.isCorrect)
      if(actionType == 'submit') {
        getChallenge()
        setResults([])
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>{isLoading ? <Loader/> : 
    <div className={styles.challengeContainer}>
      <div className={styles.header}>
        <div className={styles.title}>{challenge.title}</div>
        <div className={styles.description}>{challenge.description}</div>

        <div className={styles.testCases}>
          {challenge.testCases?.slice(0, 3).map((test: any, idx: number) => (
            <div key={idx} className={styles.testCase}>
              <div className={styles.testInput}>
                <span>Input:</span> {test.input}
              </div>
              <div className={styles.testOutput}>
                <span>Expected:</span> {test.expectedOutput}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.editorContainer}>
        <Editor
          defaultLanguage="javascript"
          value={code}
          onChange={(v) => setCode(v)}
          theme="vs-dark"
          className={styles.editor}
        />
        <div className={styles.footer}>
          <div className={styles.runButton} onClick={() => handleSubmit('run')}>Run</div>
          <div className={styles.submitButton} onClick={() => handleSubmit('submit')}>Submit</div>
        </div>
        {results.length > 0 && (
          <div className={styles.results}>
            <div className={`${styles.verdict} ${allPassed ? styles.accepted : styles.failed}`}>
              {allPassed ? "✅ Accepted" : "❌ Some test cases failed"}
            </div>
            {/* Tab buttons */}
            <div className={styles.tabHeader}>
              {results.slice(0, 3).map((_, idx) => (
                <div
                  key={idx}
                  className={`${styles.tabButton} ${activeTab === idx ? styles.activeTab : ""}`}
                  onClick={() => setActiveTab(idx)}
                >
                  Case {idx + 1}
                </div>
              ))}
            </div>

            {/* Tab content */}
            <div className={styles.tabContent}>
              <div className={`${styles.resultCase} ${results[activeTab].expectedOutput == results[activeTab].output ? styles.pass : styles.fail}`}>
                <div><span>Input:</span> {results[activeTab].input}</div>
                <div><span>Expected:</span> {results[activeTab].expectedOutput}</div>
                <div><span>Output:</span> {JSON.stringify(results[activeTab].output)}</div>
                {/* <div><span>Status:</span> {results[activeTab].expectedOutput == results[activeTab].output ? "✅ Passed" : "❌ Failed"}</div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    }</div>
  )
}

export default Challenges