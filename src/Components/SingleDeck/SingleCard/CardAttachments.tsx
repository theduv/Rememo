interface CardAttachmentsProps {
  attachments: any[];
}

const CardAttachments = (props: CardAttachmentsProps) => {
  return (
    <div>
      {props.attachments.map((attachment) => (
        <img src={attachment.url} width={40} />
      ))}
    </div>
  );
};

export default CardAttachments;
