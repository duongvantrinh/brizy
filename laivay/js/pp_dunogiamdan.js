$(document).ready(function() {
        // thousand separator & number only

        $('.txt-loan-repayment').keyup(function() {

            this.value = this.value.replace(/[^0-9\.]/g, ''); // number only

        });

        $("#money").keyup(function() {
            var str = $(this).val();
            str = str.replace(/\D+/g, '');
            $(this).val(str.replace(/\d(?=(?:\d{3})+(?!\d))/g, '$&,'));
        });


    });

    function converNumber(number) {
        var strNumber = "";
        strNumber = String(number);
        return strNumber.replace(/\d(?=(?:\d{3})+(?!\d))/g, '$&,')
    }


    function calcLoan() {
        var summoney = 0,
            time = 0,
            percent = 0,
            date, tmpDate;
        var goc = 0,
            lai = 0,
            goc_lai = 0,
            sum_goc = 0,
            sum_lai = 0,
            tempGoc;
        var day, month, year;

        // check field
        if ($("#money").val() == "") {
            alert("Số tiền không được rỗng");
            $("#money").focus();
            return;
        }
        if ($("#time").val() == "") {
            alert("Thời gian không được rỗng");
            $("#time").focus();
            return;
        }
        if ($("#percent").val() == "") {
            alert("Lãi suất không được rỗng");
            $("#percent").focus();
            return;
        }

        summoney = parseInt($("#money").val().replace(/\,/g, '')); // remove ,
        time = parseInt($("#time").val());
        percent = parseFloat($("#percent").val());
        date = $("#date").val();


        var d = new Date(date);

        day = d.getDate();
        month = d.getMonth() + 1;
        year = d.getFullYear();
        var strDate = day + "/" + ((month < 10) ? "0" + month : month) + "/" + year;


        tempGoc = summoney;


        var strResult = "";
        strResult = "<table class=\"tbl-list-repayment\"  cellpadding=\"0\" cellspacing=\"0\" border=\"1\" bordercolor=\"#e2e2e2\" bgcolor=\"#fafafa\">"

        strResult += "<tr>" + "<th width=\"20%\" align=\"center\" colspan=\"2\">Kỳ trả nợ</th>" + "<th width=\"20%\" align=\"center\">Số gốc còn lại</th>" + "<th width=\"20%\" align=\"center\">Gốc</th>" + "<th width=\"20%\" align=\"center\">Lãi</th>" + "<th width=\"20%\" align=\"center\">Tổng gốc + Lãi</th>" + "</tr>";

        strResult += "<tr>" + "<td width=\"15%\" align=\"center\">" + strDate + "</td>" + "<td width=\"5%\" align=\"center\">0</td>" + "<td width=\"20%\" align=\"center\">" + converNumber(summoney) + "</td>" + "<td width=\"20%\" align=\"center\"></td>" + "<td width=\"20%\" align=\"center\"></td>" + "<td width=\"20%\" align=\"center\"></td>" + "</tr>";

        goc = parseInt(summoney) / time; // tính gốc
        //	lai= parseInt(summoney) /12 * percent / 100; // tính lãi



        for (var i = 0; i < time; i++) {
            sum_goc = sum_goc + goc;

            lai = parseInt(tempGoc) / 12 * percent / 100; // tính lãi

            tempGoc = tempGoc - goc; // gốc còn lại theo từng tháng
            goc_lai = goc + lai;
            sum_lai = sum_lai + lai;

            // cộng ngày tháng
            if (month == 12) {
                month = 1;
                year = year + 1;
            } else {
                month = month + 1;
            }
            strDate = day + "/" + ((month < 10) ? "0" + month : month) + "/" + year;

            strResult += "<tr>" + "<td width=\"15%\" align=\"center\">" + strDate + "</td>" + "<td width=\"5%\" align=\"center\">" + (i + 1) + "</td>" + "<td width=\"20%\" align=\"center\">" + converNumber(Math.round(tempGoc)) + "</td>" + "<td width=\"20%\" align=\"center\">" + converNumber(Math.round(goc)) + "</td>" + "<td width=\"20%\" align=\"center\">" + converNumber(Math.round(lai)) + "</td>" + "<td width=\"20%\" align=\"center\">" + converNumber(Math.round(goc_lai)) + "</td>" + "</tr>"
        }

        strResult += "<tr>" + "<th width=\"15%\" align=\"center\">Tổng</th>" + "<th width=\"5%\" align=\"center\"></th>" + "<th width=\"20%\" align=\"center\"></th>" + "<th width=\"20%\" align=\"center\">" + converNumber(Math.round(sum_goc)) + "</th>" + "<th width=\"20%\" align=\"center\">" + converNumber(Math.round(sum_lai)) + "</th>" + "<th width=\"20%\" align=\"center\">" + converNumber(Math.round(sum_goc + sum_lai)) + "</th>" + "</tr>"

        strResult += "</table>";


        document.getElementById("listRepayment").innerHTML = strResult;
    }