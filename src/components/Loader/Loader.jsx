import { Puff } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => (
  <div className={css.overlay}>
    <Puff
      height="160"
      width="160"
      radius={1}
      color="gray"
      ariaLabel="puff-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  </div>
);

export default Loader;
