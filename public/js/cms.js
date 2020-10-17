$(document).ready(function () {
  "use stricts";

  let photo = null;

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  function addPhoto(photo) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "/cms/add-photo",
        type: "post",
        data: photo,
      })
        .done((res) => resolve(res))
        .fail((err) => reject(err));
    });
  }

  $("#btn-add-photo").on("click", async function () {
    const { title, type } = document.forms["frm-add-photo"];

    if (!title.value || !type.value) {
      alert("bạn cần nhập tiêu đề, kiểu cho photo");
      return;
    }

    if (!photo) {
      alert("bạn chưa chọn hình ảnh");
      return;
    }

    const items = {
      title: title.value,
      type: type.value,
      image: await toBase64(photo),
    };

    const newPhoto = await addPhoto(items);
    alert(newPhoto.msg);
  });

  $("#upload-photo").on("change", function () {
    const fileData = $(this).prop("files")[0];
    const typesAccept = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/webp",
    ];
    const limit = 1048576;

    if ($.inArray(fileData.type, typesAccept) === -1) {
      alert(
        "Kiểu file không hợp lệ, chỉ chấp nhận file có định dạng png, jpg, jpeg, gif",
        "error",
        8
      );
      $(this).val(null);
      return;
    }

    if (fileData.size > limit) {
      alert("Ảnh upload tối đa 1MB", "error", 5);
      $(this).val(null);
      return;
    }

    photo = fileData;
  });
});
