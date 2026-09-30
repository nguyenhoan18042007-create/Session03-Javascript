const customerAge = 19;
const movieRating = "T18";
const seatType = "VIP";
const roomFormatCode = 2;
const dayOfWeek = 4;
const isStudent = true;
const isPhysicalTicket = true;
const comboOptionCode = 1;

let isOrderValid = true;
let baseSeatPrice = 0;
let seatDescription = "";
let roomSurcharge = 0;
let roomFormatName = "";
let discountAmount = 0;
let netTicketPrice = 0;
let comboFee = 0;
let comboName = "";
let physicalTicketFee = 0;
let totalPayable = 0;
let logisticsGift = "";

if (
    isNaN(customerAge) ||
    !Number.isInteger(customerAge) ||
    customerAge < 1 ||
    customerAge > 120
) {
    isOrderValid = false;
    console.error("[LỖI] Dữ liệu độ tuổi không hợp lệ.");
} else {
    if (movieRating === "P") {
        isOrderValid = true;
    } else if (movieRating === "T13" && customerAge >= 13) {
        isOrderValid = true;
    } else if (movieRating === "T16" && customerAge >= 16) {
        isOrderValid = true;
    } else if (movieRating === "T18" && customerAge >= 18) {
        isOrderValid = true;
    } else if (
        movieRating !== "P" &&
        movieRating !== "T13" &&
        movieRating !== "T16" &&
        movieRating !== "T18"
    ) {
        isOrderValid = false;
        console.error("[LỖI] Mã phân loại phim không tồn tại.");
    } else {
        isOrderValid = false;
        console.warn("[TỪ CHỐI] Khán giả không đủ độ tuổi theo quy định của bộ phim.");
    }
}

if (isOrderValid === true) {
    if (seatType === "STANDARD") {
        baseSeatPrice = 80000;
        seatDescription = "Ghế Tiêu Chuẩn";
    } else if (seatType === "VIP") {
        baseSeatPrice = 95000;
        seatDescription = "Ghế VIP";
    } else if (seatType === "COUPLE") {
        baseSeatPrice = 160000;
        seatDescription = "Ghế Đôi Sweetbox";
    } else {
        isOrderValid = false;
        baseSeatPrice = 0;
        console.error("[LỖI] Hạng ghế không hợp lệ.");
    }
}

if (isOrderValid === true) {
    switch (roomFormatCode) {
        case 1:
            roomFormatName = "2D Tiêu Chuẩn";
            roomSurcharge = 0;
            break;

        case 2:
            roomFormatName = "3D IMAX (Kèm Kính Chuyên Dụng)";
            roomSurcharge = 40000;
            break;

        case 3:
            roomFormatName = "4DX Đa Giác Quan (Chuyển Động & Hiệu Ứng)";
            roomSurcharge = 60000;
            break;

        default:
            isOrderValid = false;
            roomSurcharge = 0;
            console.error("[LỖI] Định dạng phòng chiếu không tồn tại.");
    }
}

if (isOrderValid === true) {
    discountAmount =
        isStudent && (dayOfWeek >= 2 && dayOfWeek <= 6)
            ? baseSeatPrice * 0.2
            : 0;

    netTicketPrice = baseSeatPrice - discountAmount;

    switch (comboOptionCode) {
        case 0:
            comboName = "Không chọn bắp nước";
            comboFee = 0;
            break;

        case 1:
            comboName = "Solo Box (1 Bắp Ngọt + 1 Nước)";
            comboFee = 65000;
            break;

        case 2:
            comboName = "Couple Box (1 Bắp Ngọt + 2 Nước + 1 Snack)";
            comboFee = 99000;
            break;

        default:
            comboName = "Gói không hợp lệ";
            comboFee = 0;
            console.warn(
                "[CẢNH BÁO] Mã combo không hợp lệ, chuyển về mặc định không sử dụng."
            );
    }

    physicalTicketFee = isPhysicalTicket === true ? 5000 : 0;

    totalPayable =
        netTicketPrice +
        roomSurcharge +
        comboFee +
        physicalTicketFee;

    logisticsGift =
        totalPayable >= 200000
            ? "Voucher Bắp Ngọt Miễn Phí Suất Chiếu Kế Tiếp"
            : "Không có quà tặng kèm";

    console.log(`
========================================
      PHIẾU ĐIỀU PHỐI HẬU CẦN VÀ VÉ XEM PHIM
========================================
Độ tuổi khán giả     : ${customerAge} tuổi (Mác phim: ${movieRating})
Hạng ghế lựa chọn    : ${seatDescription} - ${baseSeatPrice} VNĐ
Định dạng phòng chiếu: ${roomFormatName} (Phụ phí: ${roomSurcharge} VNĐ)
Giảm giá ưu đãi HSSV : -${discountAmount} VNĐ
Tiền vé sau ưu đãi   : ${netTicketPrice} VNĐ
Dịch vụ bắp nước     : ${comboName} (${comboFee} VNĐ)
Ấn phẩm vé cứng      : ${isPhysicalTicket === true ? "Có yêu cầu in" : "Không in"} (${physicalTicketFee} VNĐ)
----------------------------------------
TỔNG THANH TOÁN      : ${totalPayable} VNĐ
QUÀ TẶNG KÈM THEO    : ${logisticsGift}
========================================
    `);
}