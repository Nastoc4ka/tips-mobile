import React, { useState } from 'react';
import { Portal } from 'react-native-portalize';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { Add_in_circle, ArrowLeft, ArrowRight } from '../../assets/icons';
import { CreateEventModal } from '../../components';
import { hideBlur, showBlur } from '../../redux/actions';

const marginNextBtn = Dimensions.get('window').width * 0.23;
const marginPrevBtn = Dimensions.get('window').width * 0.23;

const Events = () => {
  const news = useSelector((state) => state.newsReducer.news.filter((el) => el.userId !== 0));
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

    const events = news.filter(({ eventDate }) => {
      return moment(+eventDate).format('DD.MM.YYYY') === day.format('DD.MM.YYYY');
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
      +today.format('e') === dayOfWeek && today.format('M.YYYY') === `${month + 1}.${year}`;

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
    return news.filter(
      ({ eventDate }) => moment(+eventDate).format('DD.MM.YYYY') === data.chosenDate,
    );
  };

  const createEvent = () => {
    dispatch(showBlur());
    setModalIsVisible(true);
  };

  const handleCloseModal = () => {
    setModalIsVisible(false);
    dispatch(hideBlur());
  };

  const renderEvents = () => {
    if (eventsToShowOnPickedDate().length) {
      return eventsToShowOnPickedDate().map((newsItem) => (
        <Text style={styles.title} key={newsItem.id}>
          {newsItem.theme}
        </Text>
      ));
    } else {
      return <Text>Нет событий</Text>;
    }
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
        previousComponent={<ArrowLeft margin={marginPrevBtn} />}
        nextComponent={<ArrowRight margin={marginNextBtn} />}
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
      <View style={{ height: 100 }}>{renderEvents()}</View>
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
    fontWeight: '600',
    textAlign: 'center',
  },
});
