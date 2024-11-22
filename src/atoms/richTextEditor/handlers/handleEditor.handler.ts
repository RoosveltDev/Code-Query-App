export const handleFormat = (
  command: string,
  onChange: (content: string) => void
) => {
  if (command === "createLink") {
    const url = prompt("Enter the URL:");
    if (url) {
      document.execCommand(command, false, url);
    }
  } else {
    document.execCommand(command, false);
  }

  const content = document.querySelector(".editor-content")?.innerHTML || "";
  onChange(content);
};
