<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class QualiForm
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
        Me.components = New System.ComponentModel.Container()
        Me.Panel1 = New System.Windows.Forms.Panel()
        Me.DashboardHOMEBUTT = New System.Windows.Forms.Button()
        Me.RequisitionHOMEBUTT = New System.Windows.Forms.Button()
        Me.SuppliersHOMEBUTT = New System.Windows.Forms.Button()
        Me.SuppliesBUTTHOME = New System.Windows.Forms.Button()
        Me.STAFFBUTTHOME = New System.Windows.Forms.Button()
        Me.PatientHOMEBUTT = New System.Windows.Forms.Button()
        Me.HOMEBUTT = New System.Windows.Forms.Button()
        Me.Panel2 = New System.Windows.Forms.Panel()
        Me.Label1 = New System.Windows.Forms.Label()
        Me.Label2 = New System.Windows.Forms.Label()
        Me.QualificationTypeTextBox = New System.Windows.Forms.TextBox()
        Me.qualiDate = New System.Windows.Forms.DateTimePicker()
        Me.InstitutionTextBox = New System.Windows.Forms.TextBox()
        Me.StaffQualiSearch = New System.Windows.Forms.TextBox()
        Me.Label3 = New System.Windows.Forms.Label()
        Me.Label4 = New System.Windows.Forms.Label()
        Me.Label5 = New System.Windows.Forms.Label()
        Me.AddqualiButt = New System.Windows.Forms.Button()
        Me.DataGridView1 = New System.Windows.Forms.DataGridView()
        Me.qualiSeacrhbutt = New System.Windows.Forms.Button()
        Me.Button9 = New System.Windows.Forms.Button()
        Me.StaffQualiBindingSource = New System.Windows.Forms.BindingSource(Me.components)
        Me.HOSPITALDataSet = New wellhospital.HOSPITALDataSet()
        Me.Staff_QualiTableAdapter = New wellhospital.HOSPITALDataSetTableAdapters.Staff_QualiTableAdapter()
        Me.Button1 = New System.Windows.Forms.Button()
        Me.Button3 = New System.Windows.Forms.Button()
        Me.TextBox1 = New System.Windows.Forms.TextBox()
        Me.Label6 = New System.Windows.Forms.Label()
        Me.Panel1.SuspendLayout()
        Me.Panel2.SuspendLayout()
        CType(Me.DataGridView1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.StaffQualiBindingSource, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.HOSPITALDataSet, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.SuspendLayout()
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
        Me.Panel1.Location = New System.Drawing.Point(0, 3)
        Me.Panel1.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.Panel1.Name = "Panel1"
        Me.Panel1.Size = New System.Drawing.Size(188, 1014)
        Me.Panel1.TabIndex = 3
        '
        'DashboardHOMEBUTT
        '
        Me.DashboardHOMEBUTT.Location = New System.Drawing.Point(14, 692)
        Me.DashboardHOMEBUTT.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.DashboardHOMEBUTT.Name = "DashboardHOMEBUTT"
        Me.DashboardHOMEBUTT.Size = New System.Drawing.Size(141, 83)
        Me.DashboardHOMEBUTT.TabIndex = 20
        Me.DashboardHOMEBUTT.Text = "Dashboard"
        Me.DashboardHOMEBUTT.UseVisualStyleBackColor = True
        '
        'RequisitionHOMEBUTT
        '
        Me.RequisitionHOMEBUTT.Location = New System.Drawing.Point(14, 588)
        Me.RequisitionHOMEBUTT.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.RequisitionHOMEBUTT.Name = "RequisitionHOMEBUTT"
        Me.RequisitionHOMEBUTT.Size = New System.Drawing.Size(141, 83)
        Me.RequisitionHOMEBUTT.TabIndex = 19
        Me.RequisitionHOMEBUTT.Text = "Requisition"
        Me.RequisitionHOMEBUTT.UseVisualStyleBackColor = True
        '
        'SuppliersHOMEBUTT
        '
        Me.SuppliersHOMEBUTT.Location = New System.Drawing.Point(14, 474)
        Me.SuppliersHOMEBUTT.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.SuppliersHOMEBUTT.Name = "SuppliersHOMEBUTT"
        Me.SuppliersHOMEBUTT.Size = New System.Drawing.Size(141, 83)
        Me.SuppliersHOMEBUTT.TabIndex = 18
        Me.SuppliersHOMEBUTT.Text = "Suppliers"
        Me.SuppliersHOMEBUTT.UseVisualStyleBackColor = True
        '
        'SuppliesBUTTHOME
        '
        Me.SuppliesBUTTHOME.Location = New System.Drawing.Point(14, 363)
        Me.SuppliesBUTTHOME.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.SuppliesBUTTHOME.Name = "SuppliesBUTTHOME"
        Me.SuppliesBUTTHOME.Size = New System.Drawing.Size(141, 83)
        Me.SuppliesBUTTHOME.TabIndex = 17
        Me.SuppliesBUTTHOME.Text = "Supplies"
        Me.SuppliesBUTTHOME.UseVisualStyleBackColor = True
        '
        'STAFFBUTTHOME
        '
        Me.STAFFBUTTHOME.Location = New System.Drawing.Point(14, 146)
        Me.STAFFBUTTHOME.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.STAFFBUTTHOME.Name = "STAFFBUTTHOME"
        Me.STAFFBUTTHOME.Size = New System.Drawing.Size(141, 83)
        Me.STAFFBUTTHOME.TabIndex = 16
        Me.STAFFBUTTHOME.Text = "STAFF"
        Me.STAFFBUTTHOME.UseVisualStyleBackColor = True
        '
        'PatientHOMEBUTT
        '
        Me.PatientHOMEBUTT.Location = New System.Drawing.Point(14, 254)
        Me.PatientHOMEBUTT.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.PatientHOMEBUTT.Name = "PatientHOMEBUTT"
        Me.PatientHOMEBUTT.Size = New System.Drawing.Size(141, 83)
        Me.PatientHOMEBUTT.TabIndex = 15
        Me.PatientHOMEBUTT.Text = "Patient"
        Me.PatientHOMEBUTT.UseVisualStyleBackColor = True
        '
        'HOMEBUTT
        '
        Me.HOMEBUTT.Location = New System.Drawing.Point(14, 34)
        Me.HOMEBUTT.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.HOMEBUTT.Name = "HOMEBUTT"
        Me.HOMEBUTT.Size = New System.Drawing.Size(141, 83)
        Me.HOMEBUTT.TabIndex = 14
        Me.HOMEBUTT.Text = "HOME"
        Me.HOMEBUTT.UseVisualStyleBackColor = True
        '
        'Panel2
        '
        Me.Panel2.BackColor = System.Drawing.SystemColors.ActiveCaption
        Me.Panel2.Controls.Add(Me.Label1)
        Me.Panel2.Location = New System.Drawing.Point(183, 3)
        Me.Panel2.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.Panel2.Name = "Panel2"
        Me.Panel2.Size = New System.Drawing.Size(1318, 117)
        Me.Panel2.TabIndex = 9
        '
        'Label1
        '
        Me.Label1.AutoSize = True
        Me.Label1.Font = New System.Drawing.Font("Microsoft Sans Serif", 21.75!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label1.Location = New System.Drawing.Point(494, 34)
        Me.Label1.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.Label1.Name = "Label1"
        Me.Label1.Size = New System.Drawing.Size(275, 52)
        Me.Label1.TabIndex = 0
        Me.Label1.Text = "Qualification"
        '
        'Label2
        '
        Me.Label2.AutoSize = True
        Me.Label2.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label2.Location = New System.Drawing.Point(574, 248)
        Me.Label2.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.Label2.Name = "Label2"
        Me.Label2.Size = New System.Drawing.Size(95, 29)
        Me.Label2.TabIndex = 10
        Me.Label2.Text = "Staff  ID"
        '
        'QualificationTypeTextBox
        '
        Me.QualificationTypeTextBox.Location = New System.Drawing.Point(686, 291)
        Me.QualificationTypeTextBox.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.QualificationTypeTextBox.Multiline = True
        Me.QualificationTypeTextBox.Name = "QualificationTypeTextBox"
        Me.QualificationTypeTextBox.Size = New System.Drawing.Size(298, 36)
        Me.QualificationTypeTextBox.TabIndex = 12
        '
        'qualiDate
        '
        Me.qualiDate.Location = New System.Drawing.Point(686, 374)
        Me.qualiDate.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.qualiDate.Name = "qualiDate"
        Me.qualiDate.Size = New System.Drawing.Size(298, 26)
        Me.qualiDate.TabIndex = 14
        '
        'InstitutionTextBox
        '
        Me.InstitutionTextBox.Location = New System.Drawing.Point(686, 446)
        Me.InstitutionTextBox.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.InstitutionTextBox.Multiline = True
        Me.InstitutionTextBox.Name = "InstitutionTextBox"
        Me.InstitutionTextBox.Size = New System.Drawing.Size(298, 36)
        Me.InstitutionTextBox.TabIndex = 15
        '
        'StaffQualiSearch
        '
        Me.StaffQualiSearch.Location = New System.Drawing.Point(686, 182)
        Me.StaffQualiSearch.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.StaffQualiSearch.Multiline = True
        Me.StaffQualiSearch.Name = "StaffQualiSearch"
        Me.StaffQualiSearch.Size = New System.Drawing.Size(298, 36)
        Me.StaffQualiSearch.TabIndex = 16
        '
        'Label3
        '
        Me.Label3.AutoSize = True
        Me.Label3.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label3.Location = New System.Drawing.Point(586, 298)
        Me.Label3.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.Label3.Name = "Label3"
        Me.Label3.Size = New System.Drawing.Size(68, 29)
        Me.Label3.TabIndex = 17
        Me.Label3.Text = "Type"
        '
        'Label4
        '
        Me.Label4.AutoSize = True
        Me.Label4.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label4.Location = New System.Drawing.Point(588, 375)
        Me.Label4.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.Label4.Name = "Label4"
        Me.Label4.Size = New System.Drawing.Size(63, 29)
        Me.Label4.TabIndex = 18
        Me.Label4.Text = "Date"
        '
        'Label5
        '
        Me.Label5.AutoSize = True
        Me.Label5.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label5.Location = New System.Drawing.Point(536, 454)
        Me.Label5.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.Label5.Name = "Label5"
        Me.Label5.Size = New System.Drawing.Size(114, 29)
        Me.Label5.TabIndex = 19
        Me.Label5.Text = "Institution"
        '
        'AddqualiButt
        '
        Me.AddqualiButt.BackColor = System.Drawing.SystemColors.ActiveCaption
        Me.AddqualiButt.Font = New System.Drawing.Font("Microsoft Sans Serif", 14.25!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.AddqualiButt.ForeColor = System.Drawing.SystemColors.Control
        Me.AddqualiButt.Location = New System.Drawing.Point(988, 512)
        Me.AddqualiButt.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.AddqualiButt.Name = "AddqualiButt"
        Me.AddqualiButt.Size = New System.Drawing.Size(116, 48)
        Me.AddqualiButt.TabIndex = 20
        Me.AddqualiButt.Text = "ADD"
        Me.AddqualiButt.UseVisualStyleBackColor = False
        '
        'DataGridView1
        '
        Me.DataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize
        Me.DataGridView1.Location = New System.Drawing.Point(411, 574)
        Me.DataGridView1.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.DataGridView1.Name = "DataGridView1"
        Me.DataGridView1.RowHeadersWidth = 62
        Me.DataGridView1.Size = New System.Drawing.Size(812, 332)
        Me.DataGridView1.TabIndex = 21
        '
        'qualiSeacrhbutt
        '
        Me.qualiSeacrhbutt.BackColor = System.Drawing.SystemColors.Control
        Me.qualiSeacrhbutt.Font = New System.Drawing.Font("Microsoft Sans Serif", 14.25!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.qualiSeacrhbutt.ForeColor = System.Drawing.SystemColors.ActiveCaptionText
        Me.qualiSeacrhbutt.Location = New System.Drawing.Point(1010, 149)
        Me.qualiSeacrhbutt.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.qualiSeacrhbutt.Name = "qualiSeacrhbutt"
        Me.qualiSeacrhbutt.Size = New System.Drawing.Size(141, 83)
        Me.qualiSeacrhbutt.TabIndex = 22
        Me.qualiSeacrhbutt.Text = "Search"
        Me.qualiSeacrhbutt.UseVisualStyleBackColor = False
        '
        'Button9
        '
        Me.Button9.Location = New System.Drawing.Point(1248, 940)
        Me.Button9.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.Button9.Name = "Button9"
        Me.Button9.Size = New System.Drawing.Size(190, 58)
        Me.Button9.TabIndex = 46
        Me.Button9.Text = "ADD WORK EXP"
        Me.Button9.UseVisualStyleBackColor = True
        '
        'StaffQualiBindingSource
        '
        Me.StaffQualiBindingSource.DataMember = "Staff_Quali"
        Me.StaffQualiBindingSource.DataSource = Me.HOSPITALDataSet
        '
        'HOSPITALDataSet
        '
        Me.HOSPITALDataSet.DataSetName = "HOSPITALDataSet"
        Me.HOSPITALDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema
        '
        'Staff_QualiTableAdapter
        '
        Me.Staff_QualiTableAdapter.ClearBeforeFill = True
        '
        'Button1
        '
        Me.Button1.BackColor = System.Drawing.Color.SeaGreen
        Me.Button1.Font = New System.Drawing.Font("Microsoft Sans Serif", 14.25!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Button1.ForeColor = System.Drawing.SystemColors.ButtonFace
        Me.Button1.Location = New System.Drawing.Point(1112, 492)
        Me.Button1.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.Button1.Name = "Button1"
        Me.Button1.Size = New System.Drawing.Size(112, 68)
        Me.Button1.TabIndex = 47
        Me.Button1.Text = "Save"
        Me.Button1.UseVisualStyleBackColor = False
        '
        'Button3
        '
        Me.Button3.BackColor = System.Drawing.Color.FromArgb(CType(CType(192, Byte), Integer), CType(CType(0, Byte), Integer), CType(CType(0, Byte), Integer))
        Me.Button3.Font = New System.Drawing.Font("Microsoft Sans Serif", 14.25!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Button3.ForeColor = System.Drawing.SystemColors.Control
        Me.Button3.Location = New System.Drawing.Point(858, 512)
        Me.Button3.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.Button3.Name = "Button3"
        Me.Button3.Size = New System.Drawing.Size(118, 48)
        Me.Button3.TabIndex = 48
        Me.Button3.Text = "Delete"
        Me.Button3.UseVisualStyleBackColor = False
        '
        'TextBox1
        '
        Me.TextBox1.Location = New System.Drawing.Point(686, 242)
        Me.TextBox1.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.TextBox1.Multiline = True
        Me.TextBox1.Name = "TextBox1"
        Me.TextBox1.Size = New System.Drawing.Size(298, 36)
        Me.TextBox1.TabIndex = 49
        '
        'Label6
        '
        Me.Label6.AutoSize = True
        Me.Label6.Font = New System.Drawing.Font("Microsoft Sans Serif", 12.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label6.Location = New System.Drawing.Point(588, 182)
        Me.Label6.Margin = New System.Windows.Forms.Padding(4, 0, 4, 0)
        Me.Label6.Name = "Label6"
        Me.Label6.Size = New System.Drawing.Size(60, 29)
        Me.Label6.TabIndex = 50
        Me.Label6.Text = "Staff"
        '
        'QualiForm
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(9.0!, 20.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(1476, 1017)
        Me.Controls.Add(Me.Label6)
        Me.Controls.Add(Me.TextBox1)
        Me.Controls.Add(Me.Button3)
        Me.Controls.Add(Me.Button1)
        Me.Controls.Add(Me.Button9)
        Me.Controls.Add(Me.qualiSeacrhbutt)
        Me.Controls.Add(Me.DataGridView1)
        Me.Controls.Add(Me.AddqualiButt)
        Me.Controls.Add(Me.Label5)
        Me.Controls.Add(Me.Label4)
        Me.Controls.Add(Me.Label3)
        Me.Controls.Add(Me.StaffQualiSearch)
        Me.Controls.Add(Me.InstitutionTextBox)
        Me.Controls.Add(Me.qualiDate)
        Me.Controls.Add(Me.QualificationTypeTextBox)
        Me.Controls.Add(Me.Label2)
        Me.Controls.Add(Me.Panel2)
        Me.Controls.Add(Me.Panel1)
        Me.Margin = New System.Windows.Forms.Padding(4, 5, 4, 5)
        Me.Name = "QualiForm"
        Me.Text = "QualiForm"
        Me.Panel1.ResumeLayout(False)
        Me.Panel2.ResumeLayout(False)
        Me.Panel2.PerformLayout()
        CType(Me.DataGridView1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.StaffQualiBindingSource, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.HOSPITALDataSet, System.ComponentModel.ISupportInitialize).EndInit()
        Me.ResumeLayout(False)
        Me.PerformLayout()

    End Sub

    Friend WithEvents Panel1 As Panel
    Friend WithEvents Panel2 As Panel
    Friend WithEvents Label1 As Label
    Friend WithEvents Label2 As Label
    Friend WithEvents QualificationTypeTextBox As TextBox
    Friend WithEvents qualiDate As DateTimePicker
    Friend WithEvents InstitutionTextBox As TextBox
    Friend WithEvents StaffQualiSearch As TextBox
    Friend WithEvents Label3 As Label
    Friend WithEvents Label4 As Label
    Friend WithEvents Label5 As Label
    Friend WithEvents AddqualiButt As Button
    Friend WithEvents DataGridView1 As DataGridView
    Friend WithEvents qualiSeacrhbutt As Button
    Friend WithEvents HOSPITALDataSet As HOSPITALDataSet
    Friend WithEvents StaffQualiBindingSource As BindingSource
    Friend WithEvents Staff_QualiTableAdapter As HOSPITALDataSetTableAdapters.Staff_QualiTableAdapter
    Friend WithEvents Button9 As Button
    Friend WithEvents Button1 As Button
    Friend WithEvents Button3 As Button
    Friend WithEvents TextBox1 As TextBox
    Friend WithEvents Label6 As Label
    Friend WithEvents DashboardHOMEBUTT As Button
    Friend WithEvents RequisitionHOMEBUTT As Button
    Friend WithEvents SuppliersHOMEBUTT As Button
    Friend WithEvents SuppliesBUTTHOME As Button
    Friend WithEvents STAFFBUTTHOME As Button
    Friend WithEvents PatientHOMEBUTT As Button
    Friend WithEvents HOMEBUTT As Button
End Class
