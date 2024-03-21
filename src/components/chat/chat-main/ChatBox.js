/* eslint-disable prefer-destructuring */
import { BaseComponent, html } from 'framework';
import sendAltFilledImg from '@/assets/send-alt-filled.svg';
import { messagesQuery } from '@/api/chat/messagesQuery';
import { socket } from '@/ws/ws';
import { getLoggedInUser, getToken } from '@/api/api.util';
import { uploadFileMutation } from '@/api/files/uploadFileMutation';

// TODO createObjectURL causes a memory leak

export class ChatBox extends BaseComponent {
  constructor() {
    super();
    this.messageInputRef = this.ref('message');
    this.fileInputRef = this.ref('file');
    this.file = undefined;
    this.fileState = this.state(undefined);
    this.chatSocket = socket('chat');
    this.chatFriendsGroups = this.slice('chatFriendsGroups');
    this.messages = this.query(messagesQuery(this.chatFriendsGroups.state.activeFriendOrGroup.id));
    this.uploadFile = this.mutation(uploadFileMutation());
    this.error = this.slice('error');
  }

  render() {
    this.rootCSSClasses('w-100');

    const fileDisplay = this.file?.type.startsWith('image/')
      ? html`<img src=${this.file ? URL.createObjectURL(this.file) : ''} alt="image-upload" class="chat-box-image" />`
      : html`
        <div class="chat-box-file-item rounded bg-light text-primary p-2 hide-scrollbar d-flex flex-column">
          <div class="w-100 my-auto d-flex flex-column align-items-center gap-2">
            <i class="fa-solid fa-file-lines fs-1"></i>
            <p class="fs-6 text-center text-break">${this.file?.name}</p>
          </div>
        </div>
      `;

    return html`
      <form 
        @submit=${(event) => this.handleSubmit(event)}
        class="chat-box bg-primary rounded-3 d-flex flex-column gap-3"
      >
        <div class=${`chat-box-image-container rounded ${!this.fileState.state ? 'd-none' : ''}`}>
          ${fileDisplay}
          <button type="button" class="chat-box-image-remove-button text-light hover-opacity" @click=${() => this.removeFile()}>
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div class="chat-box-content d-flex align-items-center">
          <label>
            <input id=${this.fileInputRef.id} type="file" class="d-none" @change=${(event) => this.changeFile(event)}>
            <span class="chat-box-add-button text-primary bg-white rounded-circle center cursor-pointer hover-opacity flex-shrink-0">
              <i class="fa-solid fa-plus translate-y-1"></i>
            </span>
          </label>
          <input
            id=${this.messageInputRef.id}
            type="text"
            placeholder="Text Message..."
            class="chat-box-input text-white flex-grow-1 flex-shrink-1"
          />
          <button
            type="submit"
            class="chat-box-send-button flex-shrink-0 -translate-y-1 hover-opacity"
          >
            <img src=${sendAltFilledImg} alt="send" />
          </button>
        </div>
      </form>
    `;
  }

  changeFile(event) {
    this.file = event.target.files[0];
    this.fileState.state = event.target.files[0];
  }

  removeFile() {
    this.fileInputRef.element.value = '';
    this.file = undefined;
    this.fileState.state = undefined;
  }

  async handleSubmit(event) {
    event.preventDefault();

    // message and file data
    const message = this.messageInputRef.element.value;
    const file = this.file;

    this.removeFile();
    this.messageInputRef.element.value = '';

    if (!message && !file) {
      return;
    }

    // compile all data
    const user = getLoggedInUser();

    const data = {
      message,
      file: file ? { name: file.name, src: URL.createObjectURL(file), type: file.type } : null,
      date: new Date().toISOString(),
      name: `${user.first_name} ${user.last_name}`,
      userId: user.id,
      token: getToken(),
      channelID: null,
      recipientID: null,
      isDirectMessage: true,
    };

    // optimistic update
    this.messages.state.data.push({
      content: data.message,
      date: data.date,
      name: data.name,
      userId: data.userId,
      fileName: data.file?.name,
      fileSrc: data.file?.src,
      fileType: data.file?.type,
    });

    // // upload file
    // const formData = new FormData();
    // formData.append('file', file);
    // await this.uploadFile.actions.mutate(formData);

    // if (this.uploadFile.state.status === 'error') {
    //   this.error.actions.setError('Could not send message');
    //   return;
    // }

    // // send message
    // this.socket.emit('new_message', {
    //   token: data.token,
    //   content: data.message,
    //   channelID: data.channelID,
    //   recipientID: data.recipientID,
    //   isDirectMessage: data.isDirectMessage,
    //   // get file data
    // });

    this.messages.actions.refetch();
  }
}
