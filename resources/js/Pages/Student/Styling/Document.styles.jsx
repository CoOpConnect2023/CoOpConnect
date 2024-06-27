import styled from "styled-components";

export const MainContainer = styled.main`
    display: flex;
    flex-direction: column;
    padding: 20px;
    padding-top: 0px;
`

export const Section = styled.section`
    justify-content: center;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    display: flex;
    margin-top: 40px;
    flex-direction: column;
    padding: 80px 35px;
    @media (max-width: 991px) {
        max-width: 100%;
        padding: 0 20px;
    }
`

export const DropZoneWrapper = styled.div`
    gap: 20px;
    display: flex;
    @media (max-width: 991px) {
        flex-direction: column;
        align-items: stretch;
        gap: 0;
    }
`

export const DropZoneContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 33%;
    margin-left: 20px;
    @media (max-width: 991px) {
        width: 100%;
        margin-left: 0;
        margin-top: 20px;
    }
`

export const DropZone = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 2px dashed rgba(107, 83, 140, 1);
    background-color: #eddcff;
    font-size: 23px;
    color: #000;
    line-height: 40px;
    padding: 40px;
    @media (max-width: 991px) {
        padding: 0 20px;
    }
`

export const DropZoneText = styled.div`
    font-family: Poppins, sans-serif;
    margin-top: 10px;
    @media (max-width: 991px) {
        margin: 0 8px;
    }
`

export const DropZoneDescription = styled.p`
    color: #6b538c;
    align-self: center;
    margin-top: 10px;
    font: bold 28px Poppins, sans-serif;
`

export const PreviewImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: 10px;
`

export const UploadButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`

export const DocumentWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 20px;
`

export const DocumentItem = styled.div`
 display: flex;
 flex direction: row;
 justify-content: space-between;
    border: 1px solid #ccc;
    padding: 10px;
    background-color: #f9f9f9;
    text-align: center;
    font-size: 0.75vw;
     max-width: 20vw;
     min-width:10vw;



`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`

export const PreviewImageDownload = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 10px;
`

export const DownloadButton = styled.button`
  background-color: #EDDCFF;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  height: 3vh;
  margin-left: 0.5vh;
  font-size: 0.75vw;
`

export const DeleteButton = styled.button`
  background-color: #ff0000;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  height: 3vh;
  margin-left: 0.5vh;
  font-size: 0.75vw;
  margin-top 0.5vh;
`

export const MessageContainer = styled.div`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 20px;
`

export const Message = styled.p`
  font-size: 1rem;
  color: #333;
  text-align: center;
`

