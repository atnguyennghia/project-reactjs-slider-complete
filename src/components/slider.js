import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";

const URL = "https://6243fb613da3ac772b090b0d.mockapi.io/v1/slider";

const Slider = () => {
  const [slider, setSlider] = useState([]);
  const [index, setIndex] = useState(0);
  // Call API
  const fetchSlider = async () => {
    const reponse = await fetch(URL);
    const newSlider = await reponse.json();
    console.log(newSlider);
    setSlider(newSlider);
  };
  useEffect(() => {
    fetchSlider();
  }, []);
// ****
  useEffect(() => {
    const lastIndex = slider.length - 1;
    console.log("lastIndex", lastIndex);
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, slider]);
  useEffect(() => {
    let item = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(item);
    };
  }, [index]);

  // ******
  return (
    <section className="section">
      <div className="title">
				<h2><span>/</span> reviews</h2>
			</div>
			<div className="section-center">
				{slider.map((itemPerson, personIndex) => {
					let position = 'nextSilde';
					if(personIndex === index ){
						position = 'activeSlide';
					}
					if(personIndex === index - 1 || (index === 0 && personIndex === slider.length - 1) ){
						position = 'lastSlide';
					}

					return(
						<article className={position} key= {itemPerson.id}>
							<img src={itemPerson.image} alt = {itemPerson.name} className="person-img" />
							<h4>{itemPerson.name}</h4>
							<p className="title">{itemPerson.title}</p>
							<p className="text">{itemPerson.quote}</p>
							<FaQuoteRight className="icon"/>
						</article>
					)
				})}
				<button className="prev" onClick={() => setIndex(index - 1)}>
					<FiChevronLeft/>
				</button>
				<button className="next" onClick={() => setIndex(index + 1)}>
					<FiChevronRight/>
				</button>
			</div>
    </section>
  );
};
export default Slider;
