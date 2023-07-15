import styles from "./home.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../../components/Header/Header";
import { useData } from "../../contexts/DataContext";

export const Home = () => {
  const {getDrivers,getAllCabs}=useData();
  const navigate=useNavigate();
  const [isActive,setIsActive]=useState(false);

  const highLightCard=(id)=> isActive===id?true:false;
  const clickHandler=()=>isActive==="1"?navigate("/drivers"):navigate("/cabs");

  useEffect(()=>{getDrivers();getAllCabs()},[]);
  return (
    <div className={styles[`home-container`]}>
      <Header />
      <span className={styles.select}>Select any one from below to continue</span>
      <main className={styles[`cards-container`]}>
        <section className={highLightCard("1")?styles[`highlight-card`]:styles.card} onClick={()=>setIsActive("1")}>
          <img className={styles.img} src="https://eclatsuperior.com/wp-content/uploads/2021/04/man3.jpg" alt="driver" />
          <strong className={styles.label}>DRIVER</strong>
        </section>
        <section className={highLightCard("2")?styles[`highlight-card`]:styles.card} onClick={()=>setIsActive("2")}>
          <img className={styles.img} src="https://cdni.autocarindia.com/ExtraImages/20210713115737_Buying_Used_Swift_1.jpg" alt="cab" />
          <strong className={styles.label}>CAB</strong>
        </section>
      </main>
      {isActive && <button className={styles.button} onClick={clickHandler}>CONTINUE</button>}
    </div>
  );
};