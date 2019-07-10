<?php 
/*处理上传为文件*/
copy('php://input', "../storage/test_upload");

echo "文件已上传";