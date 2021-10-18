
import { useState } from 'react';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedBackOptions/FeedBackOption';
import Section from './Section/Section';
import Notification from './Notification/Notification';

export default function App(){
  const [state, setState] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleIncrement = feedback => {
    setState(prevState => ({ ...prevState, [feedback]: prevState[feedback] + 1 }));
  };

  const countTotalFeedback = () => {
    return Object.values(state).reduce((acc, value) => acc + value, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round((state.good * 100) / countTotalFeedback());
  };


  const options = Object.keys(state);
  const total = countTotalFeedback();
  const persentage = countPositiveFeedbackPercentage();


return (
        <div>
          <Section title="Please leave feedback">
            <FeedbackOptions
              options={options}
              onLeaveFeedback={handleIncrement}
            />
          </Section>
          {total === 0 ? (
            <Notification message="No feedback given" />
          ) : (
            <Section title="Statistics">
              <Statistics
                good={state.good}
                neutral={state.neutral}
                bad={state.bad}
                total={total}
                positivePercentage={persentage}
              />
            </Section>
          )}
        </div>
      );
}
