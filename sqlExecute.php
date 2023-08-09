<?php
 include 'all_php_function.php' ?>
<?
class sqlExecute 
{

	var $_tableName;
	var $_operList;
	var $_condList;

	var $_childTableNames;
	var $_childCondList;
	var $_tabinitial;

	var $_arrField;
	var $_fieldValue;
	var $_sqlQuery;
	var $_arrField1;
	var $_fieldValue1;
	var $_sqlQuery1;

	/*var $_arrFieldF[100];
	var $_fieldValueF[100];
	var $_qlQueryF[100];*/

	function execute()
	{
		$this->_buildQuery();
	}

	function _buildQuery()
	{
	
		$i = 0;
		$this->_arrField = "";
		$this->_fieldValue = "";

		$this->_tableName =$_POST[table];
		$this->_operList = $_POST[operation];
		$this->_pkey = $_POST[pkey];
		$this->_pkeyval = $_POST[$_POST[pkey]];
		$this->_condList = str_replace("\'","'",$_POST[condition]);
		$this->_childTableName = $_POST[childTable];
		$this->_childCondList = str_replace("\'","'",$_POST[chdCondition]);
		$this->_tabinitial = $_POST[tabinitial];

		if ($this->_operList == "delete")
		{
			$sqlQuery = "delete from $this->_tableName where $this->_condList";
		
		
			if ($this->_childTableName != NULL && $this->_childCondList != NULL)
			{
				$sqlQuery1 = "delete from $this->_childTableName where $this->_childCondList";
				$this->_queryExec($sqlQuery1);
			}
		}

		foreach ($_POST as $fieldName => $Value)
		{
			
			if ($fieldName != "table" && $fieldName != "operation" && $fieldName != "condition" && $fieldName != "grouping" && $fieldName != "submit" && $fieldName != "pkey" && $fieldName != "childTable" && $fieldName != "chdCondition" && $fieldName != "bEditMode" && $fieldName != "tabinitial") 
			{	
				$nonfield=substr($fieldName,0,4);
				
			if ($nonfield != "non$" )
				{		
					if ($this->_operList == "save" or $this->_operList == "save1")
					{ 	
						$this->_arrField = $this->_arrField . "," . $fieldName;
						$this->_fieldValue= $this->_fieldValue . ",'" . $Value . "'";
					}
					
					if ($this->_operList == "update")
					{
						$this->_arrField  = $this->_arrField . "," . $fieldName . "='" . $Value . "' ";
					}
				}
			}
		}
// ------------ Following  "save"  code is for simple programs includes 4 regular buttons or 4 regular buttons with add, remove item button.
		if ($this->_operList == "save")
		{ 
			$this->_arrField = substr($this->_arrField, -(strlen($this->_arrField) - 1));
			$this->_fieldValue = substr($this->_fieldValue,-(strlen($this->_fieldValue) - 1));
			$sql="select * from $this->_tableName where $this->_pkey='$this->_pkeyval'";
			//echo "************".$sql;
			$res=mysql_query($sql);
			if ($rs=mysql_fetch_array($res))
			{
				  if (ord(substr($rs[$this->_pkey],0,1)) < 65)
				  { 
						 $pkey1=tbl_max_field($this->_tableName,$this->_pkey,"");
						// $_POST[$_POST[pkey]]=$pkey1;
				  }
				  else
				  {
						 
						 $pkey1=tbl_max_field12($this->_tableName,$this->_pkey,$this->_tabinitial);
						// $_POST[$_POST[pkey]]=$pkey1;
				  }
				  $sql="update $this->_tableName set $this->_pkey = '$pkey1' where $this->_pkey='$this->_pkeyval'";
				  $this->_queryExec($sql);
				  if (! empty($this->_childTableName))
				  {
					  $sql="update $this->_childTableName  set $this->_pkey = '$pkey1' where $this->_pkey='$this->_pkeyval'";
					  $this->_queryExec($sql);
				  }
			}
			else
			{
			
			}
		$sqlQuery = "insert into $this->_tableName ($this->_arrField) values ($this->_fieldValue)";
		}
// ------------ Following  "save1"  code is for  programs which using framing structure.

	if ($this->_operList == "save1")
		{ 
			$this->_arrField = substr($this->_arrField, -(strlen($this->_arrField) - 1));
			$this->_fieldValue = substr($this->_fieldValue,-(strlen($this->_fieldValue) - 1));
			$sql="select * from $this->_tableName where $this->_pkey='$this->_pkeyval'";
			$res=mysql_query($sql);
			if ($rs=mysql_fetch_array($res))
			{
				  if (ord(substr($rs[$this->_pkey],0,1)) < 65)
				  { 
						 $pkey1=tbl_max_field($this->_tableName,$this->_pkey,"");
						 $_POST[$_POST[pkey]]=$pkey1;
				  }
				  else
				  {
						 
						 $pkey1=tbl_max_field12($this->_tableName,$this->_pkey,$this->_tabinitial);
						 $_POST[$_POST[pkey]]=$pkey1;
				  }
				  $sql="update $this->_tableName set $this->_pkey = '$pkey1' where $this->_pkey='$this->_pkeyval'";
				  $this->_queryExec($sql);
				  if (! empty($this->_childTableName))
				  {
					  $sql="update $this->_childTableName  set $this->_pkey = '$pkey1' where $this->_pkey='$this->_pkeyval'";
					  $this->_queryExec($sql);
				  }
			}
			else
			{
			
			}
			$sqlQuery = "insert into $this->_tableName ($this->_arrField) values ($this->_fieldValue)";
		}


		if ($this->_operList == "update")
		{
			$this->_arrField = substr($this->_arrField, -(strlen($this->_arrField) - 1));
			$sqlQuery = "update $this->_tableName set $this->_arrField where $this->_condList";
		}
		
	$this->_queryExec($sqlQuery);
	}

	function _queryExec($Query)
	{	
		//echo "SSSSS".$Query;
		mysql_query($Query);
	}
}

?>