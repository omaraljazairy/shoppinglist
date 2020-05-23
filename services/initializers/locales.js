/**
 * initialize the locales store with the language from the
 * asyncStorage.
 * @author Omar Aljazairy
 * @version 1.0
 */
import {connect} from 'react-redux';
import {setLanguage} from '../../stores/actions/locales';

function initializeLocales(props) {
  props.dispatch({type: 'SET_LANGUAGE', payload: 'es'});
}

const mapDispatchToProps = dispatch => ({
  setLocales: language => dispatch(setLanguage(language)),
});

export default connect(
  null,
  mapDispatchToProps,
)(initializeLocales);
