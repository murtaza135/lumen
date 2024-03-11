import { BaseComponent, html } from 'framework';

export class ChatMainContent extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    this.rootCSSClasses('w-100 flex-grow-1 d-flex flex-column');

    return html`
      <div class="chat-main-content position-relative d-flex flex-column flex-grow-1 gap-4">
        <div class="flex-grow-1 d-flex flex-column-reverse gap-4">
          <chat-message name="John" timestamp="2023-06-30 09:20:00" message="Ut consequuntur rerum repellat sed ad sed." />
          <chat-message name="Mary" timestamp="2023-07-30 09:20:00" message="Nobis aliquid asperiores aliquid necessitatibus explicabo." />
          <chat-message name="John" timestamp="2023-08-30 09:20:00" message="Sint dolores beatae nisi voluptate autem distinctio enim voluptatem. Enim voluptate rerum et molestiae est quidem sunt ab dolorum. Eaque qui hic. Consectetur voluptates adipisci id. Neque iure praesentium. Praesentium omnis aut architecto sed ad aut ut." />
          <chat-message name="Mary" timestamp="2023-09-30 09:20:00" message="Quibusdam qui est ut exercitationem. Soluta rerum itaque aperiam officiis commodi. Odio suscipit vel doloribus nulla." />
          <chat-message name="John" timestamp="2023-10-30 09:20:00" message="minus debitis perspiciatis" />
          <chat-message name="Mary" timestamp="2023-11-30 09:20:00" message="Quia libero voluptatum aspernatur perferendis id quas dolor cumque corporis. Ipsum velit rem id nihil est. Voluptatem voluptatem eum autem id eum eveniet quasi. Provident non magni est voluptatibus ad at. Odit officia id. Culpa illo maxime vel et." />
          <chat-message name="John" timestamp="2023-12-30 09:20:00" message="Id magni rerum soluta enim incidunt velit qui." />
          <chat-message name="Mary" timestamp="2024-01-30 09:20:00" message="Nam sint optio quae sapiente velit eum ad." />
        </div>

        <div class="position-sticky bottom-0 pb-3 flex-shrink-0 bg-white mt-auto">
          <chat-box />
        </div>
      </div>
    `;
  }
}
