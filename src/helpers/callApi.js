const URL = 'https://world-cup-json-2022.fly.dev/'
import axios from "axios";

export const getTeams = async () => {
        // const response = await fetch('https://world-cup-json-2022.fly.dev/matches',{
        //     method: 'GET',  
        //     withCredentials: true,  
        //     crossorigin: true,  
        // });
        // const data = await response.json();
        const resp = await axios.get('https://world-cup-json-2022.fly.dev/matches')
        console.log(resp)
        return data
}