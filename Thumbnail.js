import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Icon } from "react-icons-kit";
import { withBaseIcon } from "react-icons-kit";
import { ic_collections } from "react-icons-kit/md/ic_collections";
import { videoCamera } from "react-icons-kit/fa/videoCamera";
import { chatbubble } from "react-icons-kit/ionicons/chatbubble";
import { play } from "react-icons-kit/fa/play";
import { numberFormatter } from "../ReUsing/ConversionNumberUnit";
import LikedIcon from "../ReUsing/Icons/LikedIcon";
import ThumbnailModal from "../../../ThumbnailModal/ThumbnailModal";
import { MODAL_API } from "../../../../Config";

export default function Thumbnail({ postData }) {
  const [eachModalAllData, setEachModalAllData] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [currentIdx, setCurrentIdx] = useState();
  // const [currentModalId, setCurrentModalId] = useState();

  const handleIdx = (changeIdx) => {
    setCurrentIdx(currentIdx + changeIdx);
    // setCurrentModalId(postData[currentIdx + changeIdx].id);
  };

  const onCloseModal = () => {
    setModalShow(false);
    setCurrentIdx(-1);
  };

  useEffect(() => {
    if (currentIdx >= 0) {
      console.log("currentIdx", currentIdx);
      // fetch(`${MODAL_API}/${postData[currentIdx].id}`);
      fetch(`/data/ThumbnailModal/ThumbnailModal.json`)
        // fetch(`https://jsonplaceholder.typicode.com/users/${currentIdx}`)
        .then((res) => res.json())
        .then((res) => setEachModalAllData(res.post));
      // .then((res) => console.log("res", res));

      setModalShow(true);
    }
  }, [currentIdx]);

  let PhotoVideoIconStyles = {
    position: "absolute",
    right: "18px",
    top: "3px",
    color: "white",
  };

  let FiguresIconStyled = {
    "margin-right": "5px",
    color: "white",
  };

  return (
    <ThumbnailWrapper>
      {postData?.map((post, idx) => {
        const multipleIconCondition =
          post.is_multiple && post.file_type == "image";

        return (
          <EachThumbnail onClick={() => setCurrentIdx(idx)}>
            {multipleIconCondition && (
              <Icon
                icon={ic_collections}
                style={PhotoVideoIconStyles}
                size={20}
              />
            )}
            {post.file_type == "video" && (
              <Icon icon={videoCamera} style={PhotoVideoIconStyles} size={17} />
            )}
            <ThumbnailImg src={post.thumbnail} />
            <HoverBlackBackground
            // isHovered={isHovered}
            ></HoverBlackBackground>
            <CountBundles>
              <LikeViewFiguresBundle>
                {post.file_type == "image" ? (
                  <>
                    <LikedIcon
                      size={23}
                      styles={FiguresIconStyled}
                      isFilled={true}
                    />
                    {numberFormatter(post.heart_figures, 1)}
                  </>
                ) : (
                  <>
                    <Icon icon={play} size={23} style={FiguresIconStyled} />
                    {numberFormatter(post.view_count, 1)}
                  </>
                )}
              </LikeViewFiguresBundle>
              <CommentFiguresBundle>
                <Icon icon={chatbubble} size={23} style={FiguresIconStyled} />
                {numberFormatter(post.comments_figures, 1)}
              </CommentFiguresBundle>
            </CountBundles>
          </EachThumbnail>
        );
      })}
      <ThumbnailModal
        eachModalAllData={eachModalAllData}
        modalShow={modalShow}
        onCloseModal={() => onCloseModal()}
        handleIdx={handleIdx}
        currentIdx={currentIdx}
      />
    </ThumbnailWrapper>
  );
}

const ThumbnailWrapper = styled.article`
  border: 1px solid red;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
`;

const EachThumbnail = styled.div`
  border: 1px solid lightskyblue;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 33.3%; */
  margin: 0px 12px 12px 0px;
  /* width: 30%; */
  /* margin-right: 5%; */
  z-index: 3;
  &:nth-child(3n) {
    margin-right: 0px;
  }

  /* &:nth-last-child(3) {
    margin-bottom: 0px;
  } */
`;

const ThumbnailImg = styled.img`
  width: 300px;
  height: 300px;
  /* z-index: 2;
  &:hover {
    filter: opacity(0.5) grayscale(80%);
    z-index: 0;
  } */
`;

const HoverBlackBackground = styled.div`
  /* display: ${(props) => (props.isHovered ? "flex" : "none")}; */
  /* &:hover {
    display: none;
    cursor: pointer;
  } */
  position: absolute;
  top: 0;
  opacity: 0.5;
  background-color: black;
  width: 300px;
  height: 300px;
  cursor: pointer;
`;

const CountBundles = styled.div`
  display: flex;
  position: absolute;
  font-size: 16px;
  font-weight: 600;
  color: white;
  z-index: 1;
`;

const LikeViewFiguresBundle = styled.div`
  display: flex;
  align-items: center;
`;

const CommentFiguresBundle = styled.div`
  margin-left: 20px;
`;
