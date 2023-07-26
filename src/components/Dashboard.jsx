import React, {useEffect, useState} from "react";
import {useFilePicker} from "use-file-picker";
import './Dashboard.css'
import BarChart from "./BarChart";

const moscow_timezone_offset = 3;

function map_question(conversation){
    return conversation['userData']?.['Vopros']
}

function filter_question(conversation){
    return map_question(conversation)
}

function map_action_hour(conversation){
    let utc_hours = new Date(conversation['lastActionDate']?.['$date'])?.getUTCHours()
    return (utc_hours + moscow_timezone_offset) % 24
}


function Dashboard(props) {
    const [openFileSelector, { filesContent, loading }] = useFilePicker({
        accept: '.json',
    });

    const [hoursFrequency, setHoursFrequency] = useState();
    const [questions, setQuestions] = useState();

    useEffect(()=>{
        if (filesContent.length > 0){
            let content = JSON.parse(filesContent[0].content)
            setQuestions(content.filter(filter_question).map(map_question))

            let hours = content.filter(map_action_hour).map(map_action_hour)

            let hours_frequency_dict = hours.reduce(function(p, c) {
                p[c] = (p[c] || 0) + 1;
                return p;
            }, {});
            setHoursFrequency(Object.keys(hours_frequency_dict).map(hour => ({hour, frequency: hours_frequency_dict[hour]})))
        }}, [filesContent]
    )

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main className={'Dashboard'}>
            <div className={"Questions"}>
                {questions && <h2 className={'QuestionsHeader'}>Вопросы абитуриентов</h2>}
                {questions &&
                <div className={"QuestionList"}>
                    {questions && questions.map(
                            (item, index) =>
                                <div className={"QuestionItem"} key={index}>
                                    {item}
                                </div>
                        )}
                </div> }
                <button onClick={() => openFileSelector()}>Select files </button>
            </div>
            {hoursFrequency && <BarChart chartData={hoursFrequency}/>}
        </main>
    );
}
export default Dashboard;