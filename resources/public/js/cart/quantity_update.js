$(document).ready(function() {  
  var total = 0.0;
  if ($(".quantity").length > 0) {
    $(".quantity").each(function(){ 
      $(this).change(function() { 
        $('#total_price').val(getTotal());
      });
    });
  }
});

var getTotal = function() {
  var total = 0.0;
  $(".quantity").each(function(){ 
      var order_id = $(this).attr('id').replace("-quantity","");
      var price = parseFloat($("#"+order_id+"-price").val());
      var quantity = parseFloat($(this).val());
      total += price*quantity;
  });
  return total;
};
