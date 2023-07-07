
import React, { useState } from 'react';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';
import styles from '../App.module.css'

const App = () => {
    const [feedback, setFeedback] = useState({
        good: 0,
        neutral: 0,
        bad: 0
    });


    const handleFeedback = (type) => {
        setFeedback((prevState) => ({
            ...prevState,
            [type]: prevState[type] + 1
        }));
    };

    const countTotalFeedback = () => {
        const { good, neutral, bad } = feedback;
        return good + neutral + bad;
    };

    const countPositiveFeedbackPercentage = () => {
        const { good } = feedback;
        const totalFeedback = countTotalFeedback();
        return totalFeedback > 0 ? Math.round((good / totalFeedback) * 100) : 0;
    };

    const totalFeedback = countTotalFeedback();
    const positivePercentage = countPositiveFeedbackPercentage();
    const options = Object.keys(feedback);

    return (
        <div className={styles.container} >
            <h1>Feedback App</h1>
            <Section title="Leave Feedback">
                <FeedbackOptions options={options} onLeaveFeedback={handleFeedback} />
            </Section>
            <Section title="Statistics">
                {totalFeedback > 0 ? (
                    <Statistics good={feedback.good} neutral={feedback.neutral} bad={feedback.bad} total={totalFeedback} positivePercentage={positivePercentage} />
                ) : (
                    <Notification message="There is no feedback" />
                )}
            </Section>
        </div>
    );
}
export default App;
