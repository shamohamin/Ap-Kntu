import Home from "../components/HomeComponent/Home";
import { connect } from "react-redux";
import {post} from '../redux/actions/actionCreator'


const Index = (props) => {
  console.log(props);
  return <div>
      <Home />
  </div>
}

Index.getInitialProps = async (props) => {
  console.log(props);
}

export default connect(() => ({foo:'foo'}),() => ({post}))(Index) ;
