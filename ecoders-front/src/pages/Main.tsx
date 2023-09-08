import { useState, useEffect } from 'react';
import styled from 'styled-components';
import LogoutMain from '../assets/Main.png';
import LoginBG from '../assets/LoginBG.png';
import Bear1 from '../assets/bear1.png';
import Bear2 from '../assets/bear2.png';
import Bear3 from '../assets/bear3.png';
import Bear4 from '../assets/bear4.png';
import Bear5 from '../assets/bear5.png';
import Bear6 from '../assets/bear6.png';
import TextPolarbear from '../assets/TextPolarBear️.png';
import state1 from '../assets/state1_sad.png';
import state2 from '../assets/state2_happysad.png';
import state3 from '../assets/state3_happyhappy.png';
import state4 from '../assets/state4_happydancing.png';
import state5 from '../assets/state5_happyshining.png';
import state6 from '../assets/state6_happylovely.png';
//(수정사항) 스탬프, 베어, state 상태관리 필요
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import EcoHabitButton from '../assets/EcoHabitDefaultButton.png';
import EcoHabitHoveringButton from '../assets/EcoHabitHoveringButton.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setUsername, setStamp } from '../redux/slice/userSlice';



const Main = () => {

  type ApiState = {
    api: {
      APIURL: string;
    };
  };
  const APIURL = useSelector((state: ApiState) => state.api.APIURL);

  const username = useSelector((state: RootState) => state.user.username); // username 상태 가져오기
  const stamp = useSelector((state: RootState) => state.user.stamp); // username 상태 가져오기

  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    // 로그인된 사용자의 정보를 가져오는 함수
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${APIURL}/member`);  // 여기서 경로는 실제 사용자 정보를 가져오는 API의 경로로 변경해야 합니다.
        setUsername(response.data.username);
        console.log(username)
        setStamp(response.data.stamp);
      } catch (error) {
        console.error("사용자 정보를 가져오는데 실패했습니다.", error);
      }
    };

    if (isLoggedIn) {
      fetchUserInfo();  // 로그인된 사용자라면 정보를 가져옵니다.
    }
  }, [isLoggedIn]);


  const [bearImage, setBearImage] = useState(Bear1); // BearImage의 초기 이미지를 설정
  const [stateImage, setStateImage] = useState(state1);
  useEffect(() => {
    switch (stamp) {
      case 0:
        setBearImage(Bear1);
        setStateImage(state1);
        break;
      case 1:
        setBearImage(Bear2);
        setStateImage(state2);
        break;
      case 2:
        setBearImage(Bear3);
        setStateImage(state3);
        break;
      case 3:
        setBearImage(Bear4);
        setStateImage(state4);
        break;
      case 4:
        setBearImage(Bear5);
        setStateImage(state5);
        break;
      case 5:
        setBearImage(Bear6);
        setStateImage(state6);
        break;
      default:
        setBearImage(Bear1);
        setStateImage(state1); // 기본값으로 Bear1을 사용
    }
  }, [stamp]); // stamp 상태가 변경될 때마다 이 useEffect를 실행

  return (
    <>
      {isLoggedIn ? (
        <>
          <Wrapper>
            <StyledImage src={LoginBG} />;
            <BearState src={stateImage} />
            <TextImage src={TextPolarbear} />
            <BearImage src={bearImage} />
            <ButtonImage
              src={isHovered ? EcoHabitHoveringButton : EcoHabitButton}
              onMouseOver={() => setIsHovered(true)}
              onMouseOut={() => setIsHovered(false)}
              onClick={() => navigate('/eco-habit')}
            />
          </Wrapper>
        </>
      ) : (
        <>
          <StyledImage src={LogoutMain} />;
        </>
      )}
    </>
  );
};

export default Main;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
`;

const StyledImage = styled.img`
  max-width: 1280px;
  width: 100%;

  @media (max-width: 1152px) {
    // 화면 크기가 1152px 이하일 때
    max-width: 700px; // 이미지의 최대 가로 폭을 500px로 제한
  }

  @media (max-width: 768px) {
    // 화면 크기가 768px 이하일 때
    max-width: 500px; // 이미지의 최대 가로 폭을 500px로 제한
  }

  @media (max-width: 480px) {
    // 화면 크기가 480px 이하일 때
    max-width: 300px; // 이미지의 최대 가로 폭을 300px로 제한
  }
`;

const TextImage = styled.img`
  position: absolute;
  top: 25%; // 버튼의 상단 위치를 조정하세요
  left: 50%; // 버튼의 좌측 위치를 조정하세요
  transform: translate(-50%, -50%); // 이 코드는 버튼의 중앙을 정확히 설정하기 위함입니다
  max-width: 1024px;
`;

const BearState = styled.img`
  position: absolute;
  top: 16%; // 버튼의 상단 위치를 조정하세요
  left: 50%; // 버튼의 좌측 위치를 조정하세요
  transform: translate(-50%, -50%); // 이 코드는 버튼의 중앙을 정확히 설정하기 위함입니다
  max-width: 1024px;
`;

const BearImage = styled.img`
  position: absolute;
  top: 52%; // 버튼의 상단 위치를 조정하세요
  left: 50%; // 버튼의 좌측 위치를 조정하세요
  transform: translate(-50%, -50%); // 이 코드는 버튼의 중앙을 정확히 설정하기 위함입니다
  width: 400px;
`;

const ButtonImage = styled.img`
  position: absolute;
  top: 80%; // 버튼의 상단 위치를 조정하세요
  left: 50%; // 버튼의 좌측 위치를 조정하세요
  transform: translate(-50%, -50%); // 이 코드는 버튼의 중앙을 정확히 설정하기 위함입니다
  max-width: 284px;

  @media (max-width: 1152px) {
    // 화면 크기가 1152px 이하일 때
    max-width: 170.4px; // 이미지의 최대 가로 폭을 500px로 제한
  }

  @media (max-width: 768px) {
    // 화면 크기가 768px 이하일 때
    max-width: 113.6px; // 이미지의 최대 가로 폭을 500px로 제한
  }

  @media (max-width: 480px) {
    // 화면 크기가 480px 이하일 때
    max-width: 71px; // 이미지의 최대 가로 폭을 300px로 제한
  }
`;
