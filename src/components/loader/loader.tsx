import classes from "./loader.module.css";
  
export const Loader = () => {
  return (
    <div className={classes.loader}>
      <div className={classes.circle}></div>
      <div className={classes.circle}></div>
      <div className={classes.circle}></div>
      <div className={classes.circle}></div>
    </div>
  );
};