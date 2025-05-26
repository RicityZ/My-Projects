<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class ItemANDdrugManageFrom
    Inherits System.Windows.Forms.Form

    'Form overrides dispose to clean up the component list.
    <System.Diagnostics.DebuggerNonUserCode()> _
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        Try
            If disposing AndAlso components IsNot Nothing Then
                components.Dispose()
            End If
        Finally
            MyBase.Dispose(disposing)
        End Try
    End Sub

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()> _
    Private Sub InitializeComponent()
        Me.Panel2 = New System.Windows.Forms.Panel()
        Me.Label1 = New System.Windows.Forms.Label()
        Me.Panel1 = New System.Windows.Forms.Panel()
        Me.DashboardHOMEBUTT = New System.Windows.Forms.Button()
        Me.RequisitionHOMEBUTT = New System.Windows.Forms.Button()
        Me.SuppliersHOMEBUTT = New System.Windows.Forms.Button()
        Me.SuppliesBUTTHOME = New System.Windows.Forms.Button()
        Me.STAFFBUTTHOME = New System.Windows.Forms.Button()
        Me.PatientHOMEBUTT = New System.Windows.Forms.Button()
        Me.HOMEBUTT = New System.Windows.Forms.Button()
        Me.ComboBox1 = New System.Windows.Forms.ComboBox()
        Me.TextBoxName = New System.Windows.Forms.TextBox()
        Me.HospitalDataSet1 = New wellhospital.HOSPITALDataSet()
        Me.Label2 = New System.Windows.Forms.Label()
        Me.TextBoxDetail = New System.Windows.Forms.TextBox()
        Me.Label3 = New System.Windows.Forms.Label()
        Me.TextBoxCostPerUnit = New System.Windows.Forms.TextBox()
        Me.Label4 = New System.Windows.Forms.Label()
        Me.DataGridView1 = New System.Windows.Forms.DataGridView()
        Me.ButtonEdit = New System.Windows.Forms.Button()
        Me.ButtonDelete = New System.Windows.Forms.Button()
        Me.ButtonAdd = New System.Windows.Forms.Button()
        Me.TextBoxQuantity = New System.Windows.Forms.TextBox()
        Me.Label5 = New System.Windows.Forms.Label()
        Me.TextBoxID = New System.Windows.Forms.TextBox()
        Me.Label6 = New System.Windows.Forms.Label()
        Me.ButtonClear = New System.Windows.Forms.Button()
        Me.Panel2.SuspendLayout()
        Me.Panel1.SuspendLayout()
        CType(Me.HospitalDataSet1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.DataGridView1, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.SuspendLayout()
        '
        'Panel2
        '
        Me.Panel2.BackColor = System.Drawing.SystemColors.ActiveCaption
        Me.Panel2.Controls.Add(Me.Label1)
        Me.Panel2.Location = New System.Drawing.Point(121, 0)
        Me.Panel2.Name = "Panel2"
        Me.Panel2.Size = New System.Drawing.Size(1061, 76)
        Me.Panel2.TabIndex = 102
        '
        'Label1
        '
        Me.Label1.AutoSize = True
        Me.Label1.Font = New System.Drawing.Font("Microsoft Sans Serif", 21.75!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label1.Location = New System.Drawing.Point(233, 22)
        Me.Label1.Name = "Label1"
        Me.Label1.Size = New System.Drawing.Size(334, 33)
        Me.Label1.TabIndex = 0
        Me.Label1.Text = "Item And Drug Manage"
        '
        'Panel1
        '
        Me.Panel1.BackColor = System.Drawing.SystemColors.ActiveCaption
        Me.Panel1.Controls.Add(Me.DashboardHOMEBUTT)
        Me.Panel1.Controls.Add(Me.RequisitionHOMEBUTT)
        Me.Panel1.Controls.Add(Me.SuppliersHOMEBUTT)
        Me.Panel1.Controls.Add(Me.SuppliesBUTTHOME)
        Me.Panel1.Controls.Add(Me.STAFFBUTTHOME)
        Me.Panel1.Controls.Add(Me.PatientHOMEBUTT)
        Me.Panel1.Controls.Add(Me.HOMEBUTT)
        Me.Panel1.Location = New System.Drawing.Point(0, 0)
        Me.Panel1.Name = "Panel1"
        Me.Panel1.Size = New System.Drawing.Size(125, 659)
        Me.Panel1.TabIndex = 101
        '
        'DashboardHOMEBUTT
        '
        Me.DashboardHOMEBUTT.Location = New System.Drawing.Point(12, 450)
        Me.DashboardHOMEBUTT.Name = "DashboardHOMEBUTT"
        Me.DashboardHOMEBUTT.Size = New System.Drawing.Size(94, 54)
        Me.DashboardHOMEBUTT.TabIndex = 27
        Me.DashboardHOMEBUTT.Text = "Dashboard"
        Me.DashboardHOMEBUTT.UseVisualStyleBackColor = True
        '
        'RequisitionHOMEBUTT
        '
        Me.RequisitionHOMEBUTT.Location = New System.Drawing.Point(12, 382)
        Me.RequisitionHOMEBUTT.Name = "RequisitionHOMEBUTT"
        Me.RequisitionHOMEBUTT.Size = New System.Drawing.Size(94, 54)
        Me.RequisitionHOMEBUTT.TabIndex = 26
        Me.RequisitionHOMEBUTT.Text = "Requisition"
        Me.RequisitionHOMEBUTT.UseVisualStyleBackColor = True
        '
        'SuppliersHOMEBUTT
        '
        Me.SuppliersHOMEBUTT.Location = New System.Drawing.Point(12, 308)
        Me.SuppliersHOMEBUTT.Name = "SuppliersHOMEBUTT"
        Me.SuppliersHOMEBUTT.Size = New System.Drawing.Size(94, 54)
        Me.SuppliersHOMEBUTT.TabIndex = 25
        Me.SuppliersHOMEBUTT.Text = "Suppliers"
        Me.SuppliersHOMEBUTT.UseVisualStyleBackColor = True
        '
        'SuppliesBUTTHOME
        '
        Me.SuppliesBUTTHOME.Location = New System.Drawing.Point(12, 236)
        Me.SuppliesBUTTHOME.Name = "SuppliesBUTTHOME"
        Me.SuppliesBUTTHOME.Size = New System.Drawing.Size(94, 54)
        Me.SuppliesBUTTHOME.TabIndex = 24
        Me.SuppliesBUTTHOME.Text = "Supplies"
        Me.SuppliesBUTTHOME.UseVisualStyleBackColor = True
        '
        'STAFFBUTTHOME
        '
        Me.STAFFBUTTHOME.Location = New System.Drawing.Point(12, 95)
        Me.STAFFBUTTHOME.Name = "STAFFBUTTHOME"
        Me.STAFFBUTTHOME.Size = New System.Drawing.Size(94, 54)
        Me.STAFFBUTTHOME.TabIndex = 23
        Me.STAFFBUTTHOME.Text = "STAFF"
        Me.STAFFBUTTHOME.UseVisualStyleBackColor = True
        '
        'PatientHOMEBUTT
        '
        Me.PatientHOMEBUTT.Location = New System.Drawing.Point(12, 165)
        Me.PatientHOMEBUTT.Name = "PatientHOMEBUTT"
        Me.PatientHOMEBUTT.Size = New System.Drawing.Size(94, 54)
        Me.PatientHOMEBUTT.TabIndex = 22
        Me.PatientHOMEBUTT.Text = "Patient"
        Me.PatientHOMEBUTT.UseVisualStyleBackColor = True
        '
        'HOMEBUTT
        '
        Me.HOMEBUTT.Location = New System.Drawing.Point(12, 22)
        Me.HOMEBUTT.Name = "HOMEBUTT"
        Me.HOMEBUTT.Size = New System.Drawing.Size(94, 54)
        Me.HOMEBUTT.TabIndex = 21
        Me.HOMEBUTT.Text = "HOME"
        Me.HOMEBUTT.UseVisualStyleBackColor = True
        '
        'ComboBox1
        '
        Me.ComboBox1.FormattingEnabled = True
        Me.ComboBox1.Items.AddRange(New Object() {"ITEM", "DRUG"})
        Me.ComboBox1.Location = New System.Drawing.Point(420, 94)
        Me.ComboBox1.Margin = New System.Windows.Forms.Padding(2)
        Me.ComboBox1.Name = "ComboBox1"
        Me.ComboBox1.RightToLeft = System.Windows.Forms.RightToLeft.No
        Me.ComboBox1.Size = New System.Drawing.Size(158, 21)
        Me.ComboBox1.TabIndex = 103
        '
        'TextBoxName
        '
        Me.TextBoxName.Location = New System.Drawing.Point(427, 144)
        Me.TextBoxName.Margin = New System.Windows.Forms.Padding(2)
        Me.TextBoxName.Name = "TextBoxName"
        Me.TextBoxName.Size = New System.Drawing.Size(155, 20)
        Me.TextBoxName.TabIndex = 104
        '
        'HospitalDataSet1
        '
        Me.HospitalDataSet1.DataSetName = "HOSPITALDataSet"
        Me.HospitalDataSet1.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema
        '
        'Label2
        '
        Me.Label2.AutoSize = True
        Me.Label2.Font = New System.Drawing.Font("Microsoft Sans Serif", 10.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label2.Location = New System.Drawing.Point(423, 125)
        Me.Label2.Margin = New System.Windows.Forms.Padding(2, 0, 2, 0)
        Me.Label2.Name = "Label2"
        Me.Label2.Size = New System.Drawing.Size(47, 17)
        Me.Label2.TabIndex = 105
        Me.Label2.Text = "NAME"
        '
        'TextBoxDetail
        '
        Me.TextBoxDetail.Location = New System.Drawing.Point(240, 203)
        Me.TextBoxDetail.Margin = New System.Windows.Forms.Padding(2)
        Me.TextBoxDetail.Multiline = True
        Me.TextBoxDetail.Name = "TextBoxDetail"
        Me.TextBoxDetail.Size = New System.Drawing.Size(213, 93)
        Me.TextBoxDetail.TabIndex = 106
        '
        'Label3
        '
        Me.Label3.AutoSize = True
        Me.Label3.Font = New System.Drawing.Font("Microsoft Sans Serif", 10.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label3.Location = New System.Drawing.Point(237, 177)
        Me.Label3.Margin = New System.Windows.Forms.Padding(2, 0, 2, 0)
        Me.Label3.Name = "Label3"
        Me.Label3.Size = New System.Drawing.Size(44, 17)
        Me.Label3.TabIndex = 107
        Me.Label3.Text = "Detail"
        '
        'TextBoxCostPerUnit
        '
        Me.TextBoxCostPerUnit.Location = New System.Drawing.Point(628, 144)
        Me.TextBoxCostPerUnit.Margin = New System.Windows.Forms.Padding(2)
        Me.TextBoxCostPerUnit.Name = "TextBoxCostPerUnit"
        Me.TextBoxCostPerUnit.Size = New System.Drawing.Size(155, 20)
        Me.TextBoxCostPerUnit.TabIndex = 108
        '
        'Label4
        '
        Me.Label4.AutoSize = True
        Me.Label4.Font = New System.Drawing.Font("Microsoft Sans Serif", 10.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label4.Location = New System.Drawing.Point(625, 125)
        Me.Label4.Margin = New System.Windows.Forms.Padding(2, 0, 2, 0)
        Me.Label4.Name = "Label4"
        Me.Label4.Size = New System.Drawing.Size(91, 17)
        Me.Label4.TabIndex = 109
        Me.Label4.Text = "Cost Per Unit"
        '
        'DataGridView1
        '
        Me.DataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize
        Me.DataGridView1.Location = New System.Drawing.Point(193, 320)
        Me.DataGridView1.Margin = New System.Windows.Forms.Padding(2)
        Me.DataGridView1.Name = "DataGridView1"
        Me.DataGridView1.RowHeadersWidth = 62
        Me.DataGridView1.RowTemplate.Height = 28
        Me.DataGridView1.Size = New System.Drawing.Size(612, 174)
        Me.DataGridView1.TabIndex = 110
        '
        'ButtonEdit
        '
        Me.ButtonEdit.BackColor = System.Drawing.SystemColors.ActiveCaption
        Me.ButtonEdit.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.ButtonEdit.ForeColor = System.Drawing.SystemColors.ActiveCaptionText
        Me.ButtonEdit.Location = New System.Drawing.Point(611, 267)
        Me.ButtonEdit.Name = "ButtonEdit"
        Me.ButtonEdit.Size = New System.Drawing.Size(83, 34)
        Me.ButtonEdit.TabIndex = 112
        Me.ButtonEdit.Text = "Edit"
        Me.ButtonEdit.UseVisualStyleBackColor = False
        '
        'ButtonDelete
        '
        Me.ButtonDelete.BackColor = System.Drawing.Color.FromArgb(CType(CType(192, Byte), Integer), CType(CType(0, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.ButtonDelete.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.ButtonDelete.ForeColor = System.Drawing.SystemColors.ButtonHighlight
        Me.ButtonDelete.Location = New System.Drawing.Point(523, 267)
        Me.ButtonDelete.Name = "ButtonDelete"
        Me.ButtonDelete.Size = New System.Drawing.Size(83, 34)
        Me.ButtonDelete.TabIndex = 113
        Me.ButtonDelete.Text = "Delete"
        Me.ButtonDelete.UseVisualStyleBackColor = False
        '
        'ButtonAdd
        '
        Me.ButtonAdd.BackColor = System.Drawing.Color.Green
        Me.ButtonAdd.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.ButtonAdd.ForeColor = System.Drawing.SystemColors.ButtonHighlight
        Me.ButtonAdd.Location = New System.Drawing.Point(699, 267)
        Me.ButtonAdd.Name = "ButtonAdd"
        Me.ButtonAdd.Size = New System.Drawing.Size(83, 34)
        Me.ButtonAdd.TabIndex = 114
        Me.ButtonAdd.Text = "Add"
        Me.ButtonAdd.UseVisualStyleBackColor = False
        '
        'TextBoxQuantity
        '
        Me.TextBoxQuantity.Location = New System.Drawing.Point(628, 214)
        Me.TextBoxQuantity.Margin = New System.Windows.Forms.Padding(2)
        Me.TextBoxQuantity.Name = "TextBoxQuantity"
        Me.TextBoxQuantity.Size = New System.Drawing.Size(155, 20)
        Me.TextBoxQuantity.TabIndex = 115
        '
        'Label5
        '
        Me.Label5.AutoSize = True
        Me.Label5.Font = New System.Drawing.Font("Microsoft Sans Serif", 10.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label5.Location = New System.Drawing.Point(625, 190)
        Me.Label5.Margin = New System.Windows.Forms.Padding(2, 0, 2, 0)
        Me.Label5.Name = "Label5"
        Me.Label5.Size = New System.Drawing.Size(61, 17)
        Me.Label5.TabIndex = 116
        Me.Label5.Text = "Quantity"
        '
        'TextBoxID
        '
        Me.TextBoxID.Location = New System.Drawing.Point(240, 144)
        Me.TextBoxID.Margin = New System.Windows.Forms.Padding(2)
        Me.TextBoxID.Name = "TextBoxID"
        Me.TextBoxID.Size = New System.Drawing.Size(155, 20)
        Me.TextBoxID.TabIndex = 118
        '
        'Label6
        '
        Me.Label6.AutoSize = True
        Me.Label6.Font = New System.Drawing.Font("Microsoft Sans Serif", 10.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label6.Location = New System.Drawing.Point(237, 124)
        Me.Label6.Margin = New System.Windows.Forms.Padding(2, 0, 2, 0)
        Me.Label6.Name = "Label6"
        Me.Label6.Size = New System.Drawing.Size(21, 17)
        Me.Label6.TabIndex = 119
        Me.Label6.Text = "ID"
        '
        'ButtonClear
        '
        Me.ButtonClear.BackColor = System.Drawing.SystemColors.Control
        Me.ButtonClear.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.ButtonClear.ForeColor = System.Drawing.SystemColors.ActiveCaptionText
        Me.ButtonClear.Location = New System.Drawing.Point(722, 521)
        Me.ButtonClear.Name = "ButtonClear"
        Me.ButtonClear.Size = New System.Drawing.Size(83, 33)
        Me.ButtonClear.TabIndex = 120
        Me.ButtonClear.Text = "Clear"
        Me.ButtonClear.UseVisualStyleBackColor = False
        '
        'ItemANDdrugManageFrom
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(6.0!, 13.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(919, 614)
        Me.Controls.Add(Me.ButtonClear)
        Me.Controls.Add(Me.Label6)
        Me.Controls.Add(Me.TextBoxID)
        Me.Controls.Add(Me.Label5)
        Me.Controls.Add(Me.TextBoxQuantity)
        Me.Controls.Add(Me.ButtonAdd)
        Me.Controls.Add(Me.ButtonDelete)
        Me.Controls.Add(Me.ButtonEdit)
        Me.Controls.Add(Me.DataGridView1)
        Me.Controls.Add(Me.Label4)
        Me.Controls.Add(Me.TextBoxCostPerUnit)
        Me.Controls.Add(Me.Label3)
        Me.Controls.Add(Me.TextBoxDetail)
        Me.Controls.Add(Me.Label2)
        Me.Controls.Add(Me.TextBoxName)
        Me.Controls.Add(Me.ComboBox1)
        Me.Controls.Add(Me.Panel2)
        Me.Controls.Add(Me.Panel1)
        Me.Margin = New System.Windows.Forms.Padding(2)
        Me.Name = "ItemANDdrugManageFrom"
        Me.Text = "G"
        Me.Panel2.ResumeLayout(False)
        Me.Panel2.PerformLayout()
        Me.Panel1.ResumeLayout(False)
        CType(Me.HospitalDataSet1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.DataGridView1, System.ComponentModel.ISupportInitialize).EndInit()
        Me.ResumeLayout(False)
        Me.PerformLayout()

    End Sub

    Friend WithEvents Panel2 As Panel
    Friend WithEvents Label1 As Label
    Friend WithEvents Panel1 As Panel
    Friend WithEvents ComboBox1 As ComboBox
    Friend WithEvents TextBoxName As TextBox
    Friend WithEvents HospitalDataSet1 As HOSPITALDataSet
    Friend WithEvents Label2 As Label
    Friend WithEvents TextBoxDetail As TextBox
    Friend WithEvents Label3 As Label
    Friend WithEvents TextBoxCostPerUnit As TextBox
    Friend WithEvents Label4 As Label
    Friend WithEvents DataGridView1 As DataGridView
    Friend WithEvents ButtonEdit As Button
    Friend WithEvents ButtonDelete As Button
    Friend WithEvents ButtonAdd As Button
    Friend WithEvents TextBoxQuantity As TextBox
    Friend WithEvents Label5 As Label
    Friend WithEvents TextBoxID As TextBox
    Friend WithEvents Label6 As Label
    Friend WithEvents ButtonClear As Button
    Friend WithEvents DashboardHOMEBUTT As Button
    Friend WithEvents RequisitionHOMEBUTT As Button
    Friend WithEvents SuppliersHOMEBUTT As Button
    Friend WithEvents SuppliesBUTTHOME As Button
    Friend WithEvents STAFFBUTTHOME As Button
    Friend WithEvents PatientHOMEBUTT As Button
    Friend WithEvents HOMEBUTT As Button
End Class
