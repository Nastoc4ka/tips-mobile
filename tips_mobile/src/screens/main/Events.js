import React, { useEffect, useState } from 'react';
import { Portal } from 'react-native-portalize';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { Arrow_left, Arrow_right, Add_in_circle } from '../../assets/icons';
import { CreateEventModal } from '../../components';
import { clearMessage, hideBlur, showBlur, fetchNewsSaga } from '../../redux/actions';

const marginNextBTN = { marginRight: Dimensions.get('window').width * 0.23 };
const marginPrevBTN = { marginLeft: Dimensions.get('window').width * 0.23 };
const Events = () => {
  const { news } = useSelector((state) => state.newsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNewsSaga());
  }, []);
  let today = moment();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [data, setData] = useState({
    chosenDate: today.format('DD.MM.YYYY'),
    title: '',
    text: '',
  });
  const [message, setMessage] = useState('');
  const customDatesStyles = (day) => {
    const styleEventDay = {
      containerStyle: {
        ...styles.customDatesStyles,
      },
      textStyle: {},
    };
    const events = news.filter(({ date }) => {
      return moment(+date).format('DD.MM.YYYY') === day.format('DD.MM.YYYY');
    });
    if (events.length) {
      styleEventDay.textStyle.color = '#24A8AC';
    }
    return styleEventDay;
  };

  const customDayHeaderStylesCallback = ({ dayOfWeek, month, year }) => {
    const styles = {
      style: {
        width: 27,
        alignItems: 'center',
      },
    };

    const isToday =
      +today.format('e') === dayOfWeek && today.format('M.YYYY') == `${month + 1}.${year}`;
    if (isToday) {
      return {
        style: {
          ...styles.style,
          borderBottomWidth: 1,
          borderBottomColor: '#24A8AC',
        },
        textStyle: {
          color: '#24A8AC',
        },
      };
    } else {
      return styles;
    }
  };

  const handleChange = (val, key) => {
    setData({
      ...data,
      [key]: val,
    });
    setMessage('');
    key === 'title' && !val.trim() && setMessage('Укажите тему события');
  };
  const onDateChange = (date) => {
    setData({
      ...data,
      chosenDate: date.format('DD.MM.YYYY'),
    });
  };

  const eventsToShowOnPickedDate = () => {
    console.log(today.format('DD.MM.YYYY'));
    return news.filter(({ date }) => moment(+date).format('DD.MM.YYYY') === data.chosenDate);
  };
  const createEvent = () => {
    dispatch(showBlur());
    setModalIsVisible(true);
  };

  const handleCloseModal = () => {
    setModalIsVisible(false);
    dispatch(hideBlur());
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addInCircleBtn} onPress={createEvent}>
        <Add_in_circle />
      </TouchableOpacity>
      <CalendarPicker
        onDateChange={onDateChange}
        startFromMonday
        dayLabelsWrapper={styles.ViewStyle}
        customDayHeaderStyles={customDayHeaderStylesCallback}
        customDatesStyles={customDatesStyles}
        weekdays={['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']}
        months={[
          'Январь',
          'Февраль',
          'Март',
          'Апрель',
          'Май',
          'Июнь',
          'Июль',
          'Август',
          'Сентябрь',
          'Октябрь',
          'Ноябрь',
          'Декабрь',
        ]}
        scrollable
        previousTitle={<Arrow_left />}
        previousTitleStyle={marginPrevBTN}
        nextTitle={<Arrow_right />}
        nextTitleStyle={marginNextBTN}
        width={Dimensions.get('window').width * 0.85}
        textStyle={{
          fontFamily: 'SF Pro Display Regular',
          fontSize: 16,
          color: '#000000',
        }}
      />
      <View style={styles.headerWrapper}>
        <Text style={styles.title}>{data.chosenDate}</Text>
      </View>
      <View style={{ height: 100 }}>
        {eventsToShowOnPickedDate().length ? (
          eventsToShowOnPickedDate().map((newsItem) => (
            <Text style={styles.title}>{newsItem.theme}</Text>
          ))
        ) : (
          <Text style={styles.text}>Нет событий</Text>
        )}
      </View>
      <Portal>
        <CreateEventModal
          data={data}
          handleChange={handleChange}
          setMessage={setMessage}
          modalIsVisible={modalIsVisible}
          handleCloseModal={handleCloseModal}
          message={message}
        />
      </Portal>
    </View>
  );
};

export default Events;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginLeft: 20,
    marginRight: 20,
  },
  customDatesStyles: {
    marginBottom: 10,
    borderBottomColor: 'rgba(36, 168, 172, 0.5)',
    borderBottomWidth: 0.5,
  },
  ViewStyle: {
    width: '100%',
    borderTopWidth: 0,
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(36, 168, 172, 0.5)',
    borderBottomWidth: 0.5,
  },
  addInCircleBtn: {
    position: 'absolute',
    zIndex: 10,
    right: 0,
  },
  headerWrapper: {
    padding: 22,
  },
  title: {
    fontSize: 17,
    color: '#24A8AC',
    fontWeight: '600',
    textAlign: 'center',
  },
  text: {
    fontSize: 17,
    textAlign: 'center',
  },
});
