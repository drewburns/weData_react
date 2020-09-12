const { default: tableService } = require("../../services/tableService");

const deleteCol = async (columnID, jwt) => {
  // TODO: try not to refresh the whole page again

  await tableService
    .deleteColumn(columnID, jwt)
    .then((response) => {
      //   console.log(response.data);
      // then run query for now
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { deleteCol };
