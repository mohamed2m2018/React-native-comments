import React, { Component } from 'react';
import {
  FlatList,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Comment from './Comment';
import commentListStyling from './commentListStyling';
import propTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class CommentsList extends Component {
  state = { text: '' };

  addComment = () => {
    let { data, onAddComment } = this.props;
    const { text } = this.state;
    data.push({
      key: Math.random(),
      commentData: {
        ownerName: 'Ananoymus',
        ownerAvatar: 'https://i.imgur.com/2FXmVPb.jpg',
        content: text,
        date: '13h ',
      },
    });
    this.setState({
      data,
    });

    this.refs.TextInput.clear();

    onAddComment();
  };

  displayLikeCondition = (commentId) => {
    console.log(commentId);
    const { data, currentUserId } = this.props;
    let comment = data.filter((comment) => comment.id === commentId);
    //check if liker id equals to current user id
    founded = comment[0].likersIds.filter(
      (likerId) => likerId === currentUserId
    );
    if (founded.length) return true;
    else return false;
  };
  render() {
    const { data } = this.props;

    return (
      <View style={commentListStyling.mainContainer}>
        <FlatList
          ref="flatList"
          onContentSizeChange={() => this.refs.flatList.scrollToEnd()}
          extraData={this.props}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={(info) => (
            <Comment
              commentData={info.item}
              displayLike={this.displayLikeCondition(info.item.id)}
            />
          )}
        />
        <KeyboardAvoidingView behavior="padding" enabled>
          <View style={commentListStyling.textInputContainer}>
            <TextInput
              ref="TextInput"
              onChangeText={(text) => {
                this.setState({ text });
              }}
              placeholderTextColor="#C3C5C8"
              style={commentListStyling.textInput}
              multiline={true}
              placeholder="Write a comment.."
            />
            <TouchableOpacity onPress={this.addComment}>
              <Icon
                style={commentListStyling.icon}
                name="send"
                size={30}
                color="#3179E8"
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

CommentsList.propTypes = {
  commentData: propTypes.shape({
    ownerName: propTypes.string.isRequired,
    ownerAvatar: propTypes.string,
    content: propTypes.string.isRequired,
    date: propTypes.string,
    liked: propTypes.bool,
    replies: propTypes.arrayOf(
      propTypes.shape({
        ownerName: propTypes.string,
        ownerAvatar: propTypes.string,
        content: propTypes.string.isRequired,
        date: propTypes.string,
      })
    ),
  }),
  onAddComment: propTypes.func,
};
