import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GiftsPageContainer } from "./giftspage.styles";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getGifts } from "../../redux/gifts/gifts.actions";
import { OptionLink } from "./giftspage.styles";

const GiftsPage = () => {
  const gifts = useSelector((store) => store.gifts.gifts);
  const images = useSelector((store) => store.gifts.images);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGifts());
  }, []);

  return (
    <GiftsPageContainer>
      {gifts.map((gift, index) => (
        <Card key={gift.id} style={{ width: "18rem" }}>
          <Card.Img variant="top" src={images[index]} />
          <Card.Body>
            <Card.Title>{gift.title}</Card.Title>
            <Card.Text>{gift.description}</Card.Text>
            <Button variant="primary">Edit</Button>
            <Button variant="primary">Deleet</Button>
          </Card.Body>
        </Card>
      ))}
      <OptionLink to="/newgift">New</OptionLink>
    </GiftsPageContainer>
  );
};

export default GiftsPage;
