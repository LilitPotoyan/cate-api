import Photos from "../../components/Photos";
import Categories from '../../components/Categories';
import MoreButton from "../../components/MoreButton";

const Main = () => {
  return <div className='main-wrapper'>
    <Categories/>
    <MoreButton />
    <Photos />
  </div>
}

export default Main;
