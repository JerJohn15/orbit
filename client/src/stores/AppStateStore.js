'use strict';

import _ from 'lodash';
import Reflux from 'reflux';
import AppActions from 'actions/AppActions';

const AppStateStore = Reflux.createStore({
  listenables: [AppActions],
  init: function() {
    this.state = {
      currentChannel: null,
      unreadMessages: {},
      mentions: {}
    };
  },
  onSetCurrentChannel: function(channel) {
    if(channel !== this.state.currentChannel) {
      this.state.currentChannel = channel;
      this._resetUnreadMessages(channel);
      this._resetMentions(channel);
      this.trigger(this.state);
    }
  },
  onIncreaseUnreadMessagesCount: function(channel, inc) {
    if(channel !== this.state.currentChannel) {
      if(!this.state.unreadMessages[channel])
        this.state.unreadMessages[channel] = 0;
      this.state.unreadMessages[channel] += inc;
      this.trigger(this.state);
    }
  },
  increaseMentionsCount: function(channel, message) {
    if(channel !== this.state.currentChannel) {
      if(!this.state.mentions[channel])
        this.state.mentions[channel] = 0;
      this.state.mentions[channel] += 1;
      this.trigger(this.state);
    }
  },
  _resetUnreadMessages: function(channel) {
    delete this.state.unreadMessages[channel];
    this.trigger(this.state);
  },
  _resetMentions: function(channel) {
    delete this.state.mentions[channel];
    this.trigger(this.state);
  }
});

export default AppStateStore;