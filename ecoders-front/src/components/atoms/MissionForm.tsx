import { styled } from "styled-components";
import { FaCircleArrowUp } from "react-icons/fa6";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addMyMission } from "../../redux/slice/missionSlice";
import { RootState } from "../../redux/store/store";
import axios from "axios";


function MissionForm () {
    const dispatch = useDispatch();
    const myMissions = useSelector((state: RootState) => state.missions.myMissions); // 미션 상태 가져오기

    const [ text, setText ] = useState('');

    const apiUrl = 'https://4345e16a-fdc3-4d6f-8760-0b3b56303a85.mock.pstmn.io/mission/my_mission';

    const postMission = async (missionData: { my_mission_id: number; text: string; completed: boolean; }) => {
        try {
            const response = await axios.post(apiUrl, missionData);
            console.log(response.data);
            return response.data;
        } catch (error: any) {
            console.error('post 도중 오류 발생', error);
            throw error;
        }
    }

    const missionHandler = async () => {
        // 빈 문자열은 추가하지 않음
        if (text.trim() === '') return;

        // 새로운 미션 객체 생성, id에 날짜는 임시
        const newMission = { my_mission_id: Date.now(), text, completed: false };

        try {
            await postMission(newMission);

             // 나만의 미션 추가 액션 디스패치
            dispatch(addMyMission(newMission));

            // 입력 값 초기화
            setText('');

            console.log("My Missions:", myMissions);
        } catch (error) {
            console.error('미션 추가 중 오류:', error);
        }

    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };


    return (
        <Container>
            <MissionInput
            placeholder="미션을 입력해주세요."
            value={text}
            onChange={changeHandler}/>
            <div className="button-box" onClick={missionHandler}>
                <FaCircleArrowUp style={{color: '#CCCCCC'}}/>
            </div>
        </Container>
    )
}

export default MissionForm;

const Container = styled.div`
    width: 300px;
    height: 30px;
    padding: 30px 20px;
    background-color: #D4E2F1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 20px;

    div {
        &.button-box {
            width: 20px;
            height: 20px;
            font-size: 20px;
        }
    }
`;

const MissionInput = styled(Input)`
    background-color: #D4E2F1;
    border: none;
    width: 15rem;
    padding-left: 0px;
`;