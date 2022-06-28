import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "./Carousel";
import { Modal } from "./Modal";

export const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({ loading: true, showModal: false });

  const toggleModal = () =>
    setDetails({ ...details, showModal: !details.showModal });

  const fetchDetails = async (id) => {
    const nunberedID = Number(id);
    try {
      const res = await fetch(
        `http://pets-v2.dev-apis.com/pets?id=${nunberedID}`
      );
      const json = await res.json();
      setDetails(Object.assign({ loading: false }, json.pets[0]));
    } catch {
      throw new Error("Api failed");
    }
  };
  const {
    animal,
    breed,
    city,
    state,
    description,
    name,
    images,
    loading,
    showModal,
  } = details;
  useEffect(() => {
    fetchDetails(id);
  }, [id]);

  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <div className="details">
      <Carousel images={images} />
      <div>
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
        <button onClick={toggleModal}>Adopt {name}</button>
        <p>{description}</p>
        {showModal ? (
          <Modal>
            <h1>Would you like to adopt {name}?</h1>
            <div className="buttons">
              <a href="https://bit.ly/pet-adopt">Yes</a>
              <button onClick={toggleModal}>No</button>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};
