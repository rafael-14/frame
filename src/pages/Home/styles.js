import styled from "styled-components";

const imgsWidthHeight = "180px";

export const MainContainer = styled.div`
  display: flex;
`;

export const Container = styled.div`
  flex: 1;
  padding: 12px;
`;

export const GridDiv = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fit, ${imgsWidthHeight});
  justify-content: center;
  margin-top: 24px;
`;

export const CardContainer = styled.div`
  width: ${imgsWidthHeight};
  overflow: hidden;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.primary.light};
  box-shadow: 0px 0px 15px -5px;
  transition: 0.3s;
  animation: ease-in;
  margin-bottom: 24px;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 15px 0px;
    cursor: pointer;
  }
`;

export const ImgDiv = styled.div`
  position: relative;
  overflow: hidden;
  height: ${imgsWidthHeight};

  img {
    width: ${imgsWidthHeight};
    height: ${imgsWidthHeight};
  }
`;

export const CardContent = styled.div`
  margin: 16px;
  margin-top: 8px;

  > div h3,
  div p {
    margin: 0;
    padding: 0;
  }

  > div h3 {
    color: ${({ theme }) => theme.colors.primary.main};
    font-size: 30px;
    margin-bottom: 8px;
  }
`;

export const Receipt = styled.ul`
  position: relative;
  overflow: auto;
  height: auto;
  width: 100%;
  min-height: 600px;
  padding-top: 16px;
  background: #fff9d8;
  box-shadow: 5px 2px 24px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  margin-top: 12px;

  p {
    position: absolute;
    margin-left: 8px;
    margin-top: -8px !important;
    color: ${({ theme }) => theme.colors.danger.main};
    cursor: pointer;
  }
`;

export const Item = styled.li`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  margin-top: 8px;

  span {
    font-family: Roboto Mono;
    font-size: 16px;
    line-height: 16px;
    text-align: center;
    margin-bottom: 8px;
    letter-spacing: -0.34px;
  }
`;

export const FooterContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
`;

export const SummaryContainer = styled.div`
  position: absolute;
  right: 0;
  margin-right: 16px;
  margin-top: 32px;
  font-weight: bold;
`;
