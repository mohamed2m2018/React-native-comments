import React, { Component } from 'react';

import { View, Text, Image,ScrollView } from 'react-native';

import PropTypes from 'prop-types';

import commentStyling from './CommentStyling';

export default class Comment extends Component {
  renderReplies = (replies) => {
    return replies.map((reply, index) => (
      <View key={index} style={commentStyling.mainWrapper}>
        <Image style={commentStyling.replyImage} source={{ uri: reply.ownerAvatar }} />
        <View style={commentStyling.wrapper}>
          <Text style={commentStyling.commentOwner}>{reply.ownerName}</Text>
          <Text style={commentStyling.content}>{reply.content}</Text>
        </View>
      </View>
    ));
  };

  render() {
    const { commentData } = this.props;
    const { content, ownerName, ownerAvatar, replies } = commentData;

    return (
      <View>
        <View style={commentStyling.mainWrapper}>
          <Image style={commentStyling.image} source={{ uri: ownerAvatar }} />
          <View style={commentStyling.wrapper}>
            <Text style={commentStyling.commentOwner}>{ownerName}</Text>
            <Text style={commentStyling.content}>{content}</Text>
          </View>
        </View>
        {replies ? this.renderReplies(replies) : null}

      </View>
    );
  }
}

Comment.propTypes = {
  commentData: PropTypes.shape({
    ownerName: PropTypes.string.isRequired,
    ownerAvatar: PropTypes.string,
    content: PropTypes.string.isRequired,
    replies: PropTypes.arrayOf(
      PropTypes.shape({
        ownerName: PropTypes.string,
        ownerAvatar: PropTypes.string,
        content: PropTypes.string.isRequired,
      })
    ),
  }),
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};
